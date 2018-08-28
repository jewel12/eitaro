"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firestore);
admin.firestore().settings({ timestampsInSnapshots: true });
function update(studiedRecordsSnap) {
    return __awaiter(this, void 0, void 0, function* () {
        const studiedRecord = studiedRecordsSnap.data();
        console.log(studiedRecord.is_correct);
        // 不正解の場合は優先度を変えずに再度学習させる
        if (!studiedRecord.is_correct) {
            return null;
        }
        const prioritySnap = yield admin.firestore().collection('priorities').where('user', '==', studiedRecord.user).where('word', '==', studiedRecord.word).limit(1).get().catch(reason => {
            return Promise.reject(reason);
        });
        if (prioritySnap.size == 0) {
            return Promise.reject(new Error('No priority'));
        }
        prioritySnap.docs[0].ref.update({ priority: 10 }).catch(reason => {
            return Promise.reject(reason);
        });
    });
}
exports.updatePriority = functions.firestore.document('studied_records/{recordID}').onCreate((recordSnap, context) => __awaiter(this, void 0, void 0, function* () {
    return update(recordSnap);
}));
//# sourceMappingURL=index.js.map
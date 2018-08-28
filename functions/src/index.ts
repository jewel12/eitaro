import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firestore)
admin.firestore().settings({timestampsInSnapshots: true})

async function update (studiedRecordsSnap) {
  const studiedRecord = studiedRecordsSnap.data()

  // 不正解の場合は優先度を変えずに再度学習させる
  if (!studiedRecord.is_correct) {
    return null
  }

  const prioritySnap = await admin.firestore().collection('priorities').where(
    'user', '==', studiedRecord.user
  ).where(
    'word', '==', studiedRecord.word
  ).limit(1).get().catch(reason => {
    return Promise.reject(reason)
  })

  if (prioritySnap.size == 0) {
    return Promise.reject(new Error('No priority'))
  }

  prioritySnap.docs[0].ref.update({priority: 10}).catch(reason => {
    return Promise.reject(reason)
  })
}

export const updatePriority = functions.firestore.document('studied_records/{recordID}').onCreate(async(recordSnap, context) => {
  return update(recordSnap)
});

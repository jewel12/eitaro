import firebase from 'firebase'
import {db} from '../db'

export async function loadWords (user) {
  const _db = await db()

  let wordRefs = []
  await _db.collection('priorities').orderBy('priority').limit(1).get().then((prSnapshot) => {
    prSnapshot.forEach(doc => wordRefs.push(doc.get('word')))
  })

  const ps = wordRefs.map(r => r.get())

  let qas = []
  await Promise.all(ps).then(docs => {
    let no = 1
    for (let doc of docs) {
      qas.push(new QA(no, doc))
      no += 1
    }
  })
  return new QAs(qas, user)
}

export class QAs {
  constructor (qas, user) {
    this.qas = qas
    this.user = user
    this.cursor = 0
    this._result = new Result()
  }

  get current () {
    return this.qas[this.cursor]
  }

  get result () {
    return this._result
  }

  all () {
    return this.qas
  }

  answer (isCorrect) {
    this._result.add(this.current, isCorrect)
    this._next()
  }

  _next () {
    this.cursor += 1
    this._current = this.qas[this.cursor]
  }

  hasNext () {
    const idx = this.cursor + 1
    if (this.qas[idx]) {
      return true
    } else {
      return false
    }
  }

  done () {
    sendResult(this._result, this.user)
  }
}

export class QA {
  constructor (no, wordDoc) {
    this._no = no
    this.word = wordDoc
  }

  get no () {
    return this._no
  }

  get wordRef () {
    return this.word.ref
  }
  get en () {
    return this.word.get('en')
  }

  get ja () {
    return this.word.get('ja')
  }

  get pos () {
    return this.word.get('pos')
  }

  get pronunciation () {
    return this.word.get('pronunciation')
  }

  isCorrect (input) {
    return this.en === input
  }
}

export class Result {
  constructor () {
    this.answered = []
  }

  all () {
    return this.answered.map(a => {
      return {
        qa: a[0],
        isCorrect: a[1]
      }
    })
  }

  add (qa, isCorrected) {
    this.answered.push([qa, isCorrected])
  }
}

async function sendResult (result, user) {
  const _db = await db()
  const batch = _db.batch()
  const studyRecords = _db.collection('studied_records')

  for (let r of result.all()) {
    batch.set(studyRecords.doc(), {
      word: r.qa.wordRef,
      is_correct: r.isCorrect,
      user: user,
      studied_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  await batch.commit()
}

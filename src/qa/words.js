import {db} from '../db'

export async function loadWords () {
  const _db = await db()

  let wordRefs = []
  await _db.collection('priorities').orderBy('priority').limit(10).get().then((prSnapshot) => {
    prSnapshot.forEach(doc => wordRefs.push(doc.get('word')))
  })

  const ps = wordRefs.map(r => r.get())

  let qas = []
  await Promise.all(ps).then(docs => {
    let no = 0
    for (let doc of docs) {
      no += 1
      qas.push(new QA(
        no,
        doc.get('en'),
        doc.get('ja'),
        doc.get('pos'),
        doc.get('pronunciation'))
      )
    }
  })
  return new QAs(qas)
}

export class QAs {
  constructor (qas) {
    this.qas = qas
    this.cursor = 0
    this._current = this.qas[this.cursor]
  }

  get current () {
    return this._current
  }

  all () {
    return this.qas
  }

  next () {
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
}

export class QA {
  constructor (no, en, ja, pos, pronunciation) {
    this._no = no
    this._en = en
    this._ja = ja
    this._pos = pos
    this._pronunciation = pronunciation
  }

  get no () {
    return this._no
  }

  get en () {
    return this._en
  }

  get ja () {
    return this._ja
  }

  get pos () {
    return this._pos
  }

  get pronunciation () {
    return this._pronunciation
  }

  isCorrect (input) {
    return this._en === input
  }
}

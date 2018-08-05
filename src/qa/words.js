import db from '../db'

export function loadWords () {
  let words = []
  db().collection('words').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      words.push(new Word(
        doc.get('en'),
        doc.get('ja'),
        doc.get('pos'),
        doc.get('pronunciation'))
      )
    })
  })
  return new Words(words)
}

export class Words {
  constructor (words) {
    this.words = words
    this.cursor = 0
    this._current = this.words[this.words]
  }

  get current () {
    return this._current
  }

  all () {
    return this.words
  }

  next () {
    this.cursor += 1
    this._current = this.words[this.cursor]
  }

  hasNext () {
    const idx = this.cursor + 1
    if (this.words[idx]) {
      return true
    } else {
      return false
    }
  }
}

class Word {
  constructor (en, ja, pos, pronunciation) {
    this._en = en
    this._ja = ja
    this._pos = pos
    this._pronunciation = pronunciation
  }
}

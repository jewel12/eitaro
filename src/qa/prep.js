export async function loadQuestions () {
  const response = await fetch('/static/data/preps.json')
  const json = await response.json()

  const shuffleArray = arr => (
    arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
  )

  const questions = shuffleArray(json.questions).slice(0, 10)

  // errors should be handled

  return new QAs(questions.map((qa, i) => {
    return new QA(i + 1, qa.question, qa.choices.map(c => {
      const correct = qa.correctChoiceId === c.id
      return new Choice(c.id, c.choice, correct)
    }))
  }))
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
  constructor (no, q, choices) {
    this._no = no
    this._question = q
    this._choices = choices
  }

  get no () {
    return this._no
  }

  get question () {
    return this._question
  }

  get choices () {
    return this._choices
  }

  get correctAnswer () {
    return this._choices.find(
      c => { return c.isCorrect() }
    )
  }
}

class Choice {
  constructor (id, choice, correct) {
    this._id = id
    this._choice = choice
    this._correct = correct
  }

  get id () {
    return this._id
  }

  get choice () {
    return this._choice
  }

  isCorrect () {
    return this._correct
  }
}

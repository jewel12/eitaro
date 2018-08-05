// Requires Firebase app initialization before use this.
import firebase from 'firebase'

var _db = null

export default function db () {
  if (_db == null) {
    _db = firebase.firestore()
    _db.settings({timestampsInSnapshots: true})
  }
  return _db
}

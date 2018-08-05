// Requires Firebase app initialization before use this.
import firebase from 'firebase'

let _db = null

export async function db () {
  if (_db == null) {
    _db = firebase.firestore()
    _db.settings({timestampsInSnapshots: true})
    await _db.enablePersistence().catch(err => {
      // These should be handled.
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    })
  }
  return _db
}

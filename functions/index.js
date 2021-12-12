// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp()

const db = admin.firestore()

exports.createUser = functions.auth.user().onCreate( user => {
    db.collection('users')
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        permissao: 1,
    })))
})

exports.addAdm = functions.https.onCall((data,context) => {
    return admin.auth().getUserByEmail(data.email).then( user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return {
            message: `Success!!! ${data.email} is adm..`
        }
    }).catch(err => {
        return err
    })
})

exports.criarAdministrador = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {admin: true})
        })
        .then(() => {
            return {message: 'se creó con éxito el administrador'}
        })
        .catch(error => error)
})

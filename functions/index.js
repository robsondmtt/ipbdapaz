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
        nivelPermissao: 'convidado',
    })))
})

exports.addAdm = functions.https.onCall((data,context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

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

exports.deleteAdm = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return admin.auth().getUserByEmail(data.email).then( user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: false
        })
    }).then(() => {
        return {
            message: `Success!!! ${data.email} tornou-se convidado..`
        }
    }).catch(err => {
        return err
    })

    
})



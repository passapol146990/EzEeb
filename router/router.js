const express = require('express')
const router = express.Router()

const admin = require('firebase-admin');
const serviceAccount = require('../mywebez-3f338-firebase-adminsdk-warup-6727451858.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
let sessions = {
  title:'',
  data:'',
  name:'',
  username:'',
  inout:'',
  reg_show:'',
  views:''
}
router.get('/',async (req,res)=>{
  views = await db.collection('views').get()
  view = views.docs.map(view => view.data())
  sessions.views = view[0].views + 1
  await db.collection('views').add({views:sessions.views})
  res.render('index.ejs',{sessions:sessions})
})

module.exports = router
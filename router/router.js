const express = require('express')
const router = express.Router()

const admin = require('firebase-admin');
const serviceAccount = require('../mywebez-3f338-firebase-adminsdk-warup-6727451858.json');

let datapass = {}
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
  if(req.cookies.login){
    sessions.data = data
    sessions.name = datapass[req.cookies.username].name
    sessions.username = req.cookies.username
    sessions.reg_show = ''
    sessions.inout = '<a class="btn btn-outline-danger" href="/logout">ออกจากระบบ</a>'
  }else{
    sessions.name = ''
    sessions.username = ''
    sessions.data = ''
    sessions.reg_show = '<p>ทำตามเงื่อนไขหากยังไม่มีบัญชี <a href="/regform">สร้างบัญชี</a></p>'
    sessions.inout = '<a class="btn btn-outline-light" href="/loginform">เข้าสู่ระบบ</a>'
  }
  res.render('index.ejs',{sessions:sessions})
})

module.exports = router
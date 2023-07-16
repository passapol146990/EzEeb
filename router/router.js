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
  sessions.name = ''
  sessions.username = ''
  sessions.data = ''
  sessions.reg_show = '<p>ทำตามเงื่อนไขหากยังไม่มีบัญชี <a href="/regform">สร้างบัญชี</a></p>'
  sessions.inout = '<a class="btn btn-outline-light" href="/loginform">เข้าสู่ระบบ</a>'
  res.render('index.ejs',{sessions:sessions})
})
let form_err =[
  {
    name:'',
    username:'',
    password:'',
    gmail:'',
    phone:''
  },
  {
    name:'',
    username:'',
    password:'',
    gmail:'',
    phone:''
  },
  {
    alert_success:''
  }
]
router.get('/regform',(req,res)=>{
  form_err[2].alert_success = ''
  res.render('regform.ejs',{form_err:form_err})
})

router.get('/loginform',(req,res)=>{
  sessions.title = ''
  sessions.reg_show = ''
  res.render('loginform.ejs',{sessions:sessions})
})

module.exports = router
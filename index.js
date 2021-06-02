const express = require('express')
const app = express()
const port = 5000
//const bodyParser = require('body-parser');

const config = require('./config/key');

const {User} = require("./models/User")

//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB Connect...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 ^^')
})

app.post('/register', (req, res) => {
  
  //회원가입 할때 필요한 정보를 가져오면 DB에 저장한다.
  const user=new User(req.body)
  user.save((err, userinfo) => {
    if (err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  }

  )

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


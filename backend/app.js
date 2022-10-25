const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const dotenv = require('dotenv')
require('dotenv').config()
const cors = require('cors')
// const path = require('path')
const morgan = require('morgan')
const { sequelize } = require('./models')
const indexRouter = require('./routes')
const errorRouter = require('./routes/error')
const usersRouter = require('./routes/users')
const dongcodeRouter = require('./routes/dongcode')
const houseinfoRouter = require('./routes/houseinfo')
const housedealRouter = require('./routes/housedeal')
const boardRouter = require('./routes/board')
// const noticeRouter = require('./routes/notice')

const app = express()
app.set('port', process.env.PORT || 3001)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true
}))

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  })

app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', indexRouter)
app.use('/api/v1/error', errorRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/dongcode', dongcodeRouter)
app.use('/api/v1/houseinfo', houseinfoRouter)
app.use('/api/v1/housedeal', housedealRouter)
app.use('/api/v1/board', boardRouter)
// app.use('/api/v1/notice', noticeRouter)


app.use((req, res, next) => {
  const error = new ErrorEvent(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404;
  next(error)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500)
  // res.render('error')
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
})
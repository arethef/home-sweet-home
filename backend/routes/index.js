const express = require('express')

const User = require('../models/user')
const Board = require('../models/board')
const Notice = require('../models/notice')

const router = express.Router()

router
  .get('/', async (req, res, next) => {
    res.status(200).send('router index.js get /')
  })

module.exports = router
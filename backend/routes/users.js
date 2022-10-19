const express = require('express')
const router = express.Router()
const jwt = require('../utils/jwt.util')
const redisClient = require('../utils/redis.util')
const auth = require('../middleware/auth')
const refresh = require('../middleware/refresh')

const User = require('../models/user')
// const Board = require('../models/board')
// const Notice = require('../models/notice')

router
  .post('/register', async (req, res, next) => {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password
      })
      console.log('routes users.js /register user: ', user);
      await user.save()
      console.log('routes users.js /register after save user: ', user);
      const userInfo = {
        id: user.id,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      }
      console.log('routes users.js /register userInfo: ', userInfo);
      res.status(201).json({ success: true, userInfo })
    } catch (err) {
      console.error('routes users.js /register err: ', err);
      next(err)
    }
  })

router
  .post('/login', async (req, res, next) => {
    try {
      console.log('routes users.js /login req.body: ', req.body);
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      console.log('routes users.js /login user.password: ', user.password);
      const isMatch = user.comparePassword(req.body.password)
      console.log('routes users.js /login isMatch: ', isMatch);
      const userInfo = {
        id: user.id,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      }
      console.log('routes users.js /login userInfo: ', userInfo);
      if (isMatch) {
        console.log('routes users.js /login isMatch true');
        /* jwt & redis start */
        const accessToken = jwt.sign(req.body.email)
        const refreshToken = jwt.refresh()
        redisClient.set(req.body.email, refreshToken)
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Authorization', 'Bearer ' + accessToken)
        res.setHeader('Refresh', 'Bearer ' + refreshToken)
        /* jwt & redis end */
        res
          .status(200)
          .json({
            success: true,
            userInfo,
            token: {
              accessToken,
              refreshToken
            }
          })
      } else {
        console.log('routes users.js /login isMatch false');
        res.status(401).json({
          success: false,
          message: "비밀번호가 틀렸습니다."
          // userInfo
        })
      }
    } catch (err) {
      console.log('routes users.js /login err: ', err);
      // next(err)
      res
        .status(401)
        .json({
          success: false,
          message: "등록되지 않은 사용자입니다."
        })
    }
  })

router
  .get('/:userId', auth.verifyToken, async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.userId
        }
      })
      const userInfo = {
        id: user.id,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      }
      console.log('routes users.js /:userId userInfo: ', userInfo);
      res
        .status(200)
        .json({ success: true, userInfo })
    } catch (err) {
      console.error('routes users.js /:userId err: ', err);
      next(err)
    }
  })

router.route('/logout')

router
  .delete('/:userId', async (req, res, next) => {
    console.log('routes users.js /:userId delete req: ', req);
    try {
      await User.destroy({
        where: {
          id: req.params.userId
        }
      })
      res.status(201).json({ success: true })
    } catch (err) {
      console.error('routes users.js /:userId delete err: ', err);
      next(err)
    }
  })


router.get('/refresh', refresh);


module.exports = router
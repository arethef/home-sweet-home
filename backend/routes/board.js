const express = require('express')
const router = express.Router()

const Board = require('../models/board')

router
  .get('/', async (req, res, next) => {
    try {
      const boards = await Board.findAll();
      console.log('routes board.js / boards: ', boards);
      res
        .status(200)
        .json({
          boards
        })
    } catch (err) {
      console.error('routes board.js / err: ', err);
      next(err)
    }
  })

router
  .post('/create', async (req, res, next) => {
    console.log('routes board.js /create called');
    try {
      const board = await Board.create({
        title: req.body.title,
        content: req.body.content,
        writer: req.body.writer,
      })
      console.log('routes board.js /create board: ', board);
      await board.save()
      console.log('routes board.js /create after save board: ', board);
      const boardInfo = {
        title: board.title,
        content: board.content,
        writer: board.writer,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt
      }
      console.log('routes board.js /create boardInfo: ', boardInfo);
      res.status(201).json({ success: true, boardInfo })
    } catch (err) {
      console.error('routes board.js /create err: ', err);
      next(err)
    }
  })

router
  .post('/update', async (req, res, next) => {

  })


module.exports = router
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
    console.log('routes board.js /create req.body: ', req.body);
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
    console.log('routes board.js /update called');
    console.log('routes board.js /update req.body: ', req.body);
    try {
      const board = await Board.update({
        title: req.body.title,
        content: req.body.content,
      },
        {
          where: { id: req.body.id }
      })
      console.log('routes board.js /update board: ', board);
      // await board.save()
      // console.log('rotues board.js /update after save board: ', board);
      const afterUpdate = await Board.findOne({
        where: {id: req.body.id}
      })
      const boardInfo = {
        title: afterUpdate.title,
        content: afterUpdate.content,
        writer: afterUpdate.writer,
        createdAt: afterUpdate.createdAt,
        updatedAt: afterUpdate.updatedAt,
      }
      console.log('routes bouard.js /update boardInfo: ', boardInfo);
      res.status(201).json({success: true, boardInfo})
    } catch (err) {
      console.error('routes board.js /update err: ', err);
      next(err)
    }
  })

router
  .delete('/delete', async (req, res, next) => {
    console.log('routes board.js /delete called');
    console.log('routes board.js /delete req.body: ', req.body);
    try {
      const afterDelete = await Board.destroy({
        where: {id: req.body.id}
      })
      console.log('routes board.js /delete afterDelete: ', afterDelete);
      const deleteResult = afterDelete;
      res.status(201).json({success: true, deleteResult})
    } catch (err) {
      console.error('routes board.js /delete err: ', err);
      next(err)
    }
  })


module.exports = router
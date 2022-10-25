const express = require('express')
const { Sequelize } = require('sequelize')
const router = express.Router()

const HouseDeal = require('../models/housedeal')

router
  .get('/:aptCode', async (req, res, next) => {
    try {
      const houseDealList = await HouseDeal.findAll({
        where: {
          aptCode: req.params.aptCode
        },
        order: [
          ['dealYear', 'DESC'],
          ['dealMonth', 'DESC'],
          ['dealDay', 'DESC']
        ]
      })
      console.log('routes housedeal.js /:aptCode houseDealList: ', houseDealList);
      res
        .status(200)
        .json({
          houseDealList
        })
    } catch (err) {
      console.error('routes housedeal.js /:aptCode err: ', err);
      next(err)
    }
  })

module.exports = router
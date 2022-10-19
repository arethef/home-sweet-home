const express = require('express')
const { Sequelize } = require('sequelize')
const router = express.Router()

const HouseInfo = require('../models/houseinfo')

router
  .get('/address/:dongCode', async (req, res, next) => {
    try {
      const addressHouses = await HouseInfo.findAll({
        where: {
          dongCode: req.params.dongCode
        }
      })
      console.log('routes houseinfo.js /address houses: ', addressHouses);
      res
        .status(200)
        .json({
          addressHouses
        })
    } catch (err) {
      console.error('routes houseinfo.js /address err: ', err);
      next(err)
    }
  })

module.exports = router
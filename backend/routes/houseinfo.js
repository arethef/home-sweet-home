const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()

const HouseInfo = require('../models/houseinfo')

router
  .get('/address/:dongCode', async (req, res, next) => {
    try {
      const addressHouses = await HouseInfo.findAll({
        where: {
          dongCode: req.params.dongCode
        },
        order: [
          ['apartmentName', 'ASC']
        ]
      })
      console.log('routes houseinfo.js /address addressHouses: ', addressHouses);
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

router
  .get('/name/:houseName', async (req, res, next) => {
    try {
      const nameHouses = await HouseInfo.findAll({
        where: {
          apartmentName: {
            [Op.like]: '%'+req.params.houseName+'%'
          }
        },
        order: [
          ['apartmentName', 'ASC']
        ]
      })
      console.log('routes houseinfo.js /name nameHouses: ', nameHouses);
      res
        .status(200)
        .json({
          nameHouses
        })
    } catch (err) {
      console.error('routes houseinfo.js /name err: ', err);
      next(err)
    }
  })

module.exports = router
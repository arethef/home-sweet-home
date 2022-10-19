const express = require('express')
const { Sequelize } = require("sequelize")
const router = express.Router()

const DongCode = require('../models/dongcode')

router
  .get('/sido', async (req, res, next) => {
    try {
      const sidoNames = await DongCode.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('sidoName')), 'sidoName']
        ],
        raw: true
      });
      const sidos = sidoNames.map(obj => obj.sidoName).filter((e) => e !== null);
      console.log('routes dongcode.js /sido sidos: ', sidos);
      res
        .status(200)
        .json({
          sidos
        })

    } catch (err) {
      console.error('routes dongcode.js /sido err: ', err);
      next(err)
    }
  })

router
  .get('/gugun/:sidoName', async (req, res, next) => {
    try {
      // console.log('routes dongcode.js /gugun req: ', req);
      // console.log('routes dongcode.js /gugun req.params.sidoName: ', req.params.sidoName);
      const sidoNameDecoded = decodeURIComponent(req.params.sidoName)
      const gugunNames = await DongCode.findAll({
        where: {
          sidoName: sidoNameDecoded
        },
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('gugunName')), 'gugunName']
        ],
        raw: true
      })
      // console.log('routes dongcode.js /gugun gugunNames: ', gugunNames);
      const guguns = gugunNames.map(obj => obj.gugunName).filter((e) => e !== null);
      console.log('routes dongcode.js /gugun guguns: ', guguns);
      res
        .status(200)
        .json({
          guguns
        })
    } catch (err) {
      console.error('routes dongcode.js /gugun err: ', err);
    }
  })

router
  .get('/dong/:gugunName/:sidoName', async (req, res, next) => {
    console.log('routes dongcode.js /dong called');
    try {
      const sidoNameDecoded = decodeURIComponent(req.params.sidoName)
      const gugunNameDecoded = decodeURIComponent(req.params.gugunName)
      const dongNames = await DongCode.findAll({
        where: {
          sidoName: sidoNameDecoded,
          gugunName: gugunNameDecoded
        },
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('dongName')), 'dongName']
        ],
        raw: true
      })
      const dongs = dongNames.map(obj => obj.dongName).filter((e) => e !== null)
      console.log('routes dongcode.js /dong dongs: ', dongs);
      res
        .status(200)
        .json({
          dongs
        })
    } catch (err) {
      console.error('routes dongcode.js /dong err: ', err);
    }
  })

router
  .get('/:dongName/:gugunName/:sidoName', async (req, res, next) => {
    console.log('routes dongcode.js /dongcode called');
    try {
      const sidoNameDecoded = decodeURIComponent(req.params.sidoName)
      const gugunNameDecoded = decodeURIComponent(req.params.gugunName)
      const dongNameDecoded = decodeURIComponent(req.params.dongName)
      const dongInfo = await DongCode.findOne({
        where: {
          sidoName: sidoNameDecoded,
          gugunName: gugunNameDecoded,
          dongName: dongNameDecoded
        }
      })
      console.log('routes dongcode.js /dongcode dongInfo: ', dongInfo);
      res
        .status(200)
        .json({
          dongInfo
        })
    } catch (err) {
      console.error('routes dongcode.js /dongcode err', err);
    }

  })


module.exports = router
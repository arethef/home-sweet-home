const Sequelize = require('sequelize');
const User = require('./user')
const DongCode = require('./dongcode')
const HouseInfo = require('./houseinfo')
const HouseDeal = require('./housedeal')
const Board = require('./board')
const Notice = require('./notice')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  { timezone: "Asia/Seoul" }
)
db.sequelize = sequelize

db.User = User;
db.DongCode = DongCode;
db.HouseInfo = HouseInfo;
db.HouseDeal = HouseDeal;
db.Board = Board;
db.Notice = Notice;

User.init(sequelize)
DongCode.init(sequelize)
HouseInfo.init(sequelize)
HouseDeal.init(sequelize)
Board.init(sequelize)
Notice.init(sequelize)

User.associate(db)
DongCode.associate(db)
HouseInfo.associate(db)
HouseDeal.associate(db)
Board.associate(db)
Notice.associate(db)

module.exports = db;

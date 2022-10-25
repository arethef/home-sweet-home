const Sequelize = require('sequelize')

module.exports = class HouseDeal extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      no: {
        type: Sequelize.BIGINT,
        allowNull: false,
        // unique: true,
        primaryKey: true
      },
      dealAmount: {
        type: Sequelize.STRING(20),
        // allowNull: false
      },
      dealYear: {
        type: Sequelize.INTEGER,
        // allowNull: false
      },
      dealMonth: {
        type: Sequelize.INTEGER,
        // allowNull: false
      },
      dealDay: {
        type: Sequelize.INTEGER,
        // allowNull: false
      },
      area: {
        type: Sequelize.STRING(20),
        // allowNull: false
      },
      floor: {
        type: Sequelize.STRING(4),
        // allowNull: false
      },
      cancelDealType: {
        type: Sequelize.STRING(1),
        // allowNull: false,
      },
      aptCode: {
        type: Sequelize.BIGINT,
        // allowNull: false,
      },
    },{
      hooks: {
      },
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'HouseDeal',
      tableName: 'housedeal',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  }

  static associate(db) {
    db.HouseDeal.belongsTo(db.HouseInfo, {foreignKey: 'aptCode', targetKey: 'aptCode'})
  }
}
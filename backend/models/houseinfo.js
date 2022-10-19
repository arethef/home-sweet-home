const Sequelize = require('sequelize')

module.exports = class HouseInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      aptCode: {
        type: Sequelize.BIGINT,
        allowNull: false,
        // unique: true,
        primaryKey: true
      },
      buildYear: {
        type: Sequelize.INTEGER,
        // allowNull: false,
      },
      roadName: {
        type: Sequelize.STRING(40),
        // allowNull: false
      },
      roadNameBonbun: {
        type: Sequelize.STRING(5),
        // allowNull: false
      },
      roadNameBubun: {
        type: Sequelize.STRING(5),
        // allowNull: false
      },
      roadNameSeq: {
        type: Sequelize.STRING(2),
        // allowNull: false
      },
      roadNameBasementCode: {
        type: Sequelize.STRING(1),
        // allowNull: false
      },
      roadNameCode: {
        type: Sequelize.STRING(7),
        // allowNull: false
      },
      dong: {
        type: Sequelize.STRING(40),
        // allowNull: false
      },
      bonbun: {
        type: Sequelize.STRING(4),
        // allowNull: false
      },
      bubun: {
        type: Sequelize.STRING(4),
        // allowNull: false
      },
      sigunguCode: {
        type: Sequelize.STRING(5),
        // allowNull: false
      },
      eubmyundongCode: {
        type: Sequelize.STRING(5),
        // allowNull: false
      },
      dongCode: {
        type: Sequelize.STRING(10),
        // allowNull: false
      },
      landCode: {
        type: Sequelize.STRING(1),
        // allowNull: false
      },
      apartmentName: {
        type: Sequelize.STRING(40),
        // allowNull: false
      },
      jibun: {
        type: Sequelize.STRING(10),
        // allowNull: false
      },
      lng: {
        type: Sequelize.STRING(30),
        // allowNull: false
      },
      lat: {
        type: Sequelize.STRING(30),
        // allowNull: false
      },
    },{
      hooks: {
      },
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'HouseInfo',
      tableName: 'houseinfo',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  }

  static associate(db) {
    db.HouseInfo.belongsTo(db.DongCode, {foreignKey: 'dongCode', targetKey: 'dongCode'})
  }
}
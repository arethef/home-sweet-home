const Sequelize = require('sequelize')

module.exports = class DongCode extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      dongCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      sidoName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      gugunName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      dongName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      }
    }, {
      hooks: {
      },
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'DongCode',
      tableName: 'dongcode',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  }

  static associate(db) {
    db.DongCode.hasMany(db.HouseInfo, {foreignKey: 'dongCode', sourceKey: 'dongCode'})
  }
}
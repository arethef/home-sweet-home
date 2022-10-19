const Sequelize = require('sequelize')

module.exports = class Notice extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Notice',
      tableName: 'notice',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }

  static associate(db) {
    db.Notice.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id' })
  }
}


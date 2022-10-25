const Sequelize = require('sequelize')

module.exports = class Board extends Sequelize.Model {
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
      writer: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Board',
      tableName: 'board',
      // paranoid: false,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
  }

  static associate(db) {
    db.Board.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id' })
  }
}


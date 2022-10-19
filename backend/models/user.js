const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: '0', // 일반: 0, 관리자: 1
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      hooks: {
        // beforeCreate: (user) => {
        //   console.log('user.js hooks beforeCreate user: ', user);
        //   console.log('user.js hooks beforeCreate user.password: ', user.password);
        //   if (user.password) {
        //     const salt = bcrypt.genSaltSync(saltRounds)
        //     const hash = bcrypt.hashSync(user.password, salt)
        //     user.password = hash
        //   }
        // },
        beforeUpdate: (user) => {
          console.log('user.js hooks beforeUpdate user: ', user);
          console.log('user.js hooks beforeUpdate user.password: ', user.password);
          if (user.password) {
            const salt = bcrypt.genSaltSync(saltRounds)
            const hash = bcrypt.hashSync(user.password, salt)
            user.password = hash
          }
        }
      },
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  }

  comparePassword(plainPassword) {
    //
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(plainPassword, salt)
    console.log('models user.js comparePassword plainPassword hash: ', hash);
    //
    return bcrypt.compareSync(plainPassword, this.password)
  }

  static associate(db) {
    db.User.hasMany(db.Board, { foreignKey: 'writer', sourceKey: 'id' })
    db.User.hasMany(db.Notice, { foreignKey: 'writer', sourceKey: 'id' })
  }
}
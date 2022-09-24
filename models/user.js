"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = ({ username, password, role }) => {
      const encryptPassword = this.#encrypt(password);

      return this.create({ username, password: encryptPassword, role });
    };

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    static authenticate = async ({ username, password }) => {
      try {
        const isUser = await this.findOne({
          where: { username},
        });
        if (!isUser) return Promise.reject("User not found!");

        const isPassword = isUser.checkPassword(password);

        if (!isPassword) return Promise.reject("Wrong password");

        return Promise.resolve(isUser);
      } catch (err) {
        return Promise.reject(err);
      }
    };
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "player"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

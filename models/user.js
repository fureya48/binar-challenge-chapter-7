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

    static authenticatePlayer = async ({ username, password }) => {
      try {
        const isPlayer = await this.findOne({
          where: { username },
        });
        if (!isPlayer) return Promise.reject("User not found!");

        const isPassword = isPlayer.checkPassword(password);

        if (!isPassword) return Promise.reject("Wrong password");

        if(isPlayer.role !== "player") return Promise.reject("Your not a player")

        return Promise.resolve(isPlayer);
      } catch (err) {
        return Promise.reject(err);
      }
    };
    static authenticateAdmin = async ({ username, password }) => {
      try {
        const isAdmin = await this.findOne({
          where: { username },
        });
        if (!isAdmin) return Promise.reject("User not found!");

        const isPassword = isAdmin.checkPassword(password);

        if (!isPassword) return Promise.reject("Wrong password");

        if(isAdmin.role !== "admin") return Promise.reject("Your not a Super User")

        return Promise.resolve(isAdmin);
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

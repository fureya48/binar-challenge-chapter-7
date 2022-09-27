"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        const isUser = await this.findOne({
          where: { username },
        });
        if (!isUser) return Promise.reject("User not found!");

        const isPassword = isUser.checkPassword(password);

        if (!isPassword) return Promise.reject("Wrong password");

        if (isUser.role !== "player") return Promise.reject("Your not a player");
        const payload = {
          id: isUser.id,
          username: isUser.username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        await this.update({ token_user: token }, { where: { username: username } });


        return Promise.resolve(isUser);
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

        if (isAdmin.role !== "admin") return Promise.reject("Your not a admin");

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
      token_user: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

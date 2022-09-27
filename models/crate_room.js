"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Crate_Room extends Model {
    static associate(models) {
      // define association here
    }

    static crateRoom = async ({ room_name }) => {
      const findRoom = await this.findOne({ where: { room_name } });
      if (!findRoom) {
        return await this.create({ room_name, player_1_id: user.id, status: "waiting" });
      }
      if (findRoom.player_2_id == null) {
        return await this.update({ player_2_id: user.id, status: "full" });
      }
      return Promise.resolve("Room berhasil dibuat")
    };
  }

  Crate_Room.init(
    {
      room_name: DataTypes.STRING,
      player_1_id: DataTypes.INTEGER,
      player_2_id: DataTypes.INTEGER,
      status: DataTypes.ENUM("waiting", "full"),
    },
    {
      sequelize,
      modelName: "Crate_Room",
    }
  );
  return Crate_Room;
};

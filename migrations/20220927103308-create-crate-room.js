'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Crate_Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_name: {
        type: Sequelize.STRING
      },
      player_1_id: {
        type: Sequelize.INTEGER
      },
      player_2_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('waiting', 'full')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Crate_Rooms');
  }
};
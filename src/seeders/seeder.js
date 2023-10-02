"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        // email: DataTypes.STRING,
        // password: DataTypes.STRING,
        // firstName: DataTypes.STRING,
        // lastName: DataTypes.STRING,
        // address: DataTypes.STRING,
        // phonenumber: DataTypes.STRING,
        // gender: DataTypes.BOOLEAN,
        // image: DataTypes.STRING,
        // roleId: DataTypes.STRING,
        // poisitionId: DataTypes.STRING,
        email: "admin@gmail.com",
        password: "123456",
        firstName: "HoiDanIt",
        lastName: "Eric",
        address: "USA",
        phonenumber:"487345345",
        gender: true,
        image:"abc",
        roleId: "ROLE",
        poisitionId: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blacklists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blacklists.belongsTo(models.User, {
        foreignKey: "patientId",
        targetKey: "id",
        as: "patientData",
      });
      
      Blacklists.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "keyMap",
        as: "statusTypeData",
      });
      Blacklists.hasOne(models.Booking,{
        foreignKey: "statusId",
      })
    }
  }
  Blacklists.init(
    {
      patientId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      statusId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Blacklists",
    },
  );
  return Blacklists;
};

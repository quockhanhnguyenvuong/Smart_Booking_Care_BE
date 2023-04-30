"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
<<<<<<< HEAD
      patientID: DataTypes.INTEGER,
=======
      patientId: DataTypes.INTEGER,
>>>>>>> 95fcdcaad8abd23173dd09e80b4adb9ba86ac827
      doctorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      files: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "History",
    },
  );
  return History;
};

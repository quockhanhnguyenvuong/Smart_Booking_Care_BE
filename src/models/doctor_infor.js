"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Infor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      Doctor_Infor.belongsTo(models.User, {foreignKey: 'doctorId'});
      Doctor_Infor.belongsTo(models.Allcode, {foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData'});
      Doctor_Infor.belongsTo(models.Allcode, {foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData'});
      Doctor_Infor.belongsTo(models.Allcode, {foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData'});
=======
>>>>>>> 95fcdcaad8abd23173dd09e80b4adb9ba86ac827
    }
  }
  Doctor_Infor.init(
    {
      doctorId: DataTypes.INTEGER,
<<<<<<< HEAD
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic:DataTypes.STRING,
      nameClinic:DataTypes.STRING,
      note:DataTypes.STRING,
      count: DataTypes.INTEGER

=======
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
>>>>>>> 95fcdcaad8abd23173dd09e80b4adb9ba86ac827
    },
    {
      sequelize,
      modelName: "Doctor_Infor",
<<<<<<< HEAD
      freezeTableName: true
=======
>>>>>>> 95fcdcaad8abd23173dd09e80b4adb9ba86ac827
    },
  );
  return Doctor_Infor;
};

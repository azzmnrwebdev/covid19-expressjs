// TODO 5: SETUP MODEL

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      status: DataTypes.STRING,
      in_date_at: DataTypes.DATE,
      out_date_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};

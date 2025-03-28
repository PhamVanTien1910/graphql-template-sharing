import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import UserRoles from "../enum/userRole.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.ENUM(...Object.values(UserRoles)),
    defaultValue: UserRoles.USER,
  },
});

export default User;

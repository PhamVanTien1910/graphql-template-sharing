import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { hashPassword } from "../utils/hash.js";
import UserRoles from "../enum/userRole.js";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected");
    // auto run migration
    await sequelize.sync({ alter: true });
    const adminExists = await User.findOne({ where: { email: "admin@example.com" } });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@example.com",
        address: "Da Nang",
        password: hashPassword("admin123"),
        role: UserRoles.ADMIN,
        age: 30
      });
      console.log("Admin user created!");
    } else {
      console.log("Admin user already exists.");
    }

  } catch (err) {
    console.error("Database Connection Failed:", err.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };

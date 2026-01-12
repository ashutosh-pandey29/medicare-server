/**
 * ---------------------------------------------------------
 * Purpose:
 * Interactive Admin Seeder Script
 *
 * - Takes admin credentials from terminal
 * - Checks if admin already exists
 * - Creates admin user securely
 *
 * Run:
 * node .\src\seed\interactiveAdminSeed.js
 * ---------------------------------------------------------
 */

import readline from "readline";
import chalk from "chalk";
import User from "../models/User.js";
import { hashPassword } from "../helpers/password.helper.js";
import connectDB from "../config/dbConnection.js";
import { db } from "../services/db/db.service.js";
import { isValidUsername, isValidEmail, isValidPassword } from "./inputValidation.js";

//  Connect DB
await connectDB();

// console.log(chalk.cyanBright("\n🔌Database connected successfully\n"));

// Readline setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//  Styled question helper
const ask = (question) =>
  new Promise((resolve) => rl.question(chalk.blue("➤ ") + chalk.white(question), resolve));

// Seed admin logic
const seedAdmin = async () => {
  try {
    console.log(chalk.yellow("🛠 Admin Seeding Started\n"));
    const username = await ask("Enter admin username: ");
    const email = await ask("Enter admin email: ");
    const password = await ask("Enter admin password: ");

    // validate input

    if (!isValidUsername(username)) {
      console.log(chalk.red("Invalid username (only a-z A-Z 0-9 allowed, min 3 chars)"));
      cleanup(1);
    }

    if (!isValidEmail(email)) {
      console.log(chalk.red("Invalid email format"));
      cleanup(1);
    }

    if (!isValidPassword(password)) {
      console.log(chalk.red("Password must be at least 8 characters long"));
      cleanup(1);
    }

    // Check existing admin
    const exists = await db.fetchOne(User, { role: "admin", email });

    if (exists) {
      console.log(chalk.yellowBright("Admin already exists. Seeding skipped.\n"));
      cleanup(0);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin
    const admin = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      isEmailVerified: true,
      status: "active",
    });

    console.log(chalk.greenBright("Admin created successfully!\n"));
    console.log(chalk.green(`Username : ${admin.username}`));
    console.log(chalk.green(`Email    : ${admin.email}\n`));

    cleanup(0);
  } catch (err) {
    console.error(chalk.redBright("\nFailed to create admin"), chalk.red(err.message));
    cleanup(1);
  }
};

// Cleanup helper
const cleanup = (code = 0) => {
  rl.close();
  process.exit(code);
};

// Run script
seedAdmin();

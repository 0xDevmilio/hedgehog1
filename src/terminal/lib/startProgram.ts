import { mainMenu } from "./mainMenu";
import { checkForUpdates } from "./updater";
import { db } from "..";
import { encrypt, unlockPrivateKey } from "../utils/encription";
import { assignVariables, type Data } from "../variables";
import { input, password } from "@inquirer/prompts";
import fs from "fs";
import type { Account, Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { checkAccess, registerAccess } from "../utils/request";

export let account: Account;

// Start the program
export async function startProgram() {
  // Check if the database file exists
  if (!fs.existsSync("HedgeHogDB.db")) {
    // If database file not found, create a new one
    console.log("Database file not found. Creating a new one.");

    // Ask for private key and password to encrypt it
    const privateKey = await password({ message: "Enter your private key:" });
    const passwordInput = await password({
      message: "Set a password to encrypt your private key:",
    });

    account = privateKeyToAccount(privateKey as Address);
    if (!account) throw new Error();
    const walletAddress = account.address;

    // Ask for access code
    const accesCode = await input({ message: "Set the access code:" });

    // Register the access code
    const register = await registerAccess(walletAddress, accesCode);
    if (!register) {
      console.log("Access denied");
      process.exit(0);
    }

    // Encrypt the private key
    const encryptedKey = encrypt(privateKey, passwordInput);

    // Set the database data
    db.data = {
      version: "2.0.1",
      settings: {
        privateKey: encryptedKey,
        deadline: 25,
        gasApprove: 1,
        gasBuy: 3,
        gasSell: 1,
        slippageBuy: 25,
        slippageSell: 25,
        accessCode: accesCode,
      },
    } satisfies Data;

    // Write the database
    await db.write();
    console.log("Private key saved and encrypted.");

    // Initialize variables
    assignVariables();

    // Check for updates
    await checkForUpdates();

    // Show main menu
    mainMenu();
  } else {
    // Load the database
    await db.read();

    // Explicitly type db.data as Data
    const data = db.data as Data;

    // Check for null values in settings and assign default values if necessary
    if (!data.settings.deadline) data.settings.deadline = 25;
    if (!data.settings.gasApprove) data.settings.gasApprove = 1;
    if (!data.settings.gasBuy) data.settings.gasBuy = 3;
    if (!data.settings.gasSell) data.settings.gasSell = 1;
    if (!data.settings.slippageBuy) data.settings.slippageBuy = 25;
    if (!data.settings.slippageSell) data.settings.slippageSell = 25;
    if (!data.settings.accessCode) data.settings.accessCode = "";
    await db.write();

    // Check if the access code is set
    if (!data.settings.accessCode) {
      // If the access code is not set, ask for it
      const accessCode = await input({ message: "Enter the access code:" });
      data.settings.accessCode = accessCode;
      await db.write();
      console.log("Access code saved.");
    }

    // If the private key is not set, ask for it
    if (!data.settings.privateKey) {
      const privateKey = await input({ message: "Enter your private key:" });
      const passwordInput = await password({
        message: "Set a password to encrypt your private key:",
      });

      const encryptedKey = encrypt(privateKey, passwordInput);
      data.settings.privateKey = encryptedKey;
      await db.write();
      console.log("Private key saved and encrypted.");

      account = privateKeyToAccount(privateKey as Address);
      if (!account) throw new Error("Invalid private key");

      // Initialize variables
      assignVariables();

      const walletAddress = account.address;
      const access = await checkAccess(walletAddress, data.settings.accessCode);

      if (!access) {
        console.log("Access denied");
        process.exit(0);
      }

      // Check for updates
      await checkForUpdates();

      // Show main menu
      mainMenu();
    } else {
      // Check for null values in settings and assign default values if necessary
      if (!data.settings.deadline) data.settings.deadline = 25;
      if (!data.settings.gasApprove) data.settings.gasApprove = 1;
      if (!data.settings.gasBuy) data.settings.gasBuy = 3;
      if (!data.settings.gasSell) data.settings.gasSell = 1;
      if (!data.settings.slippageBuy) data.settings.slippageBuy = 25;
      if (!data.settings.slippageSell) data.settings.slippageSell = 25;
      if (!data.settings.accessCode) data.settings.accessCode = "";
      await db.write();

      // If the private key is set, unlock it
      const pk = await unlockPrivateKey();

      account = privateKeyToAccount(pk as Address);
      if (!account) throw new Error("Invalid private key");

      // Initialize variables
      assignVariables();

      const walletAddress = account.address;
      const access = await checkAccess(walletAddress, data.settings.accessCode);
      if (!access) {
        console.log("Access denied");
        process.exit(0);
      }

      // Check for updates
      await checkForUpdates();

      // Show main menu
      mainMenu();
    }
  }
}

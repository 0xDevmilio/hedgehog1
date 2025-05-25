import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import dotenv from "dotenv";
import { startProgram } from "./lib/startProgram";

dotenv.config();

// Create a new instance of LowDB
const adapter = new JSONFile("HedgeHogDB.db");
export const db = new Low(adapter, {});

startProgram();

// Clear the console when the program exits
process.on("exit", () => {
  //console.clear();
});

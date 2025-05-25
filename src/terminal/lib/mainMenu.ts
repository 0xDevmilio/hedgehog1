import { handleApprove } from "./handleApprove";
import { handleBuy } from "./handleBuy";
import { handleSell } from "./handleSell";
import { optionsMenu } from "./optionsMenu";
import { assignVariables } from "../variables";
import { input } from "@inquirer/prompts";
import { ASCCIIART } from "../../blockchain/lib/asciiArt";
import { safeExecute } from "../utils/functions";

export let firstRun = true;
// Main menu function
export async function mainMenu() {
  assignVariables();
  if (firstRun) {
    ASCCIIART();
    firstRun = false;
  }

  const action = await input({
    message:
      "Choose an action:\n1. Buy\n2. Sell\n3. Approve\n4. Options\n5. Exit\nEnter the number of your choice:",
    validate: (input) => {
      const validChoices = ["1", "2", "3", "4", "5"];
      if (validChoices.includes(input)) {
        return true;
      }
      return "Please enter a valid number";
    },
  });

  switch (action) {
    case "1":
      await safeExecute(handleBuy);
      break;
    case "2":
      await safeExecute(handleSell);
      break;
    case "3":
      await safeExecute(handleApprove);
      break;
    case "4":
      await safeExecute(optionsMenu);
      break;
    case "5":
      process.exit(0);
    default:
      console.log("Invalid choice.");
  }

  // Return to main menu after handling the action
  await mainMenu();
}

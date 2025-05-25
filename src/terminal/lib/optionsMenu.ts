import { mainMenu } from "./mainMenu";
import { db } from "..";
import { unlockPrivateKey } from "../utils/encription";
import {
  type Data,
  assignVariables,
  deadline,
  gasApprove,
  gasBuy,
  gasSell,
  slippageBuy,
  slippageSell,
} from "../variables";
import { rawlist, input } from "@inquirer/prompts";

// Options menu function
export async function optionsMenu() {
  assignVariables();
  const choices = [
    { name: "Deadline (Current: " + deadline + ")", value: "deadline" },
    {
      name: "Gas Approve (Current: " + gasApprove + ")",
      value: "gasApprove",
    },
    { name: "Gas Buy (Current:" + gasBuy + ")", value: "gasBuy" },
    { name: "Gas Sell (Current:" + gasSell + ")", value: "gasSell" },
    {
      name: "Change Slippage Buy (Current: " + slippageBuy + ")",
      value: "slippageBuy",
    },
    {
      name: "Change Slippage Sell (Current: " + slippageSell + ")",
      value: "slippageSell",
    },
    { name: "Extract Private Key", value: "extractPrivateKey" },
    { name: "Exit", value: "exit" },
  ];

  const option = await rawlist({
    message: "Choose an option to change:",
    choices: choices.map((choice) => choice.name),
  });

  if (option === "Exit") {
    return;
  }

  if (option === "Extract Private Key") {
    const privateKey = await unlockPrivateKey();
    console.log("Your private key is:", privateKey);
    console.log("Console will clear in 5 seconds...");
    setTimeout(() => {
      console.clear();
      mainMenu();
    }, 5000);
    return;
  }

  const selectedChoice = choices.find((choice) => choice.name === option);

  const newValue = await input({
    message: `Enter new value for ${selectedChoice?.name}:`,
    validate: (input) => {
      if (
        selectedChoice?.value.startsWith("gas") ||
        selectedChoice?.value === "percentageSell"
      ) {
        return !isNaN(Number(input)) && Number(input) > 0
          ? true
          : "Please enter a valid number.";
      }
      return !isNaN(Number(input)) && Number(input) > 0
        ? true
        : "Please enter a valid number.";
    },
  });

  const data = db.data as Data;

  switch (selectedChoice?.value) {
    case "deadline":
      data.settings.deadline = Number(newValue);
      break;
    case "gasApproval":
      data.settings.gasApprove = Number(newValue);
      break;
    case "gasBuy":
      data.settings.gasBuy = Number(newValue);
      break;
    case "gasSell":
      data.settings.gasSell = Number(newValue);
      break;
    case "slippageBuy":
      data.settings.slippageBuy = Number(newValue);
      break;
    case "slippageSell":
      data.settings.slippageSell = Number(newValue);
      break;
  }

  await db.write();
  console.log(`${selectedChoice?.name} has been updated to ${newValue}`);
  await optionsMenu(); // Return to options menu after updating
}

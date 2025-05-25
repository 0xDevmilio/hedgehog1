import { mainMenu } from "./mainMenu";
import { account } from "./startProgram";
import { deadline, gasSell, slippageSell } from "../variables";
import { sellAction } from "../../blockchain/actions/sell";
import { input } from "@inquirer/prompts";
import { isAddress, type Address } from "viem";

export async function handleSell() {
  const tokenAddress = await input({
    message: "Enter the token address",
    validate: (input) => {
      if (isAddress(input)) {
        return true;
      }
      return "Please enter a valid Address";
    },
  });

  const percentageInput = await input({
    message: "Enter the percentage:",
    validate: (input) => {
      const amount = parseFloat(input);
      if (!isNaN(amount) && amount > 0) {
        return true;
      }
      return "Please enter a valid percentage";
    },
  });

  await sellAction(
    account,
    BigInt(percentageInput),
    gasSell,
    slippageSell,
    tokenAddress as Address,
    deadline
  );

  // Return to main menu after selling
  await mainMenu();
}

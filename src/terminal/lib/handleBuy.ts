import { mainMenu } from "./mainMenu";
import { account } from "./startProgram";
import { gasBuy, slippageBuy, deadline } from "../variables";
import { buyAction } from "../../blockchain/actions/buy";
import { input } from "@inquirer/prompts";
import type { Address } from "viem";
import { isAddress, parseEther } from "viem/utils";

export async function handleBuy() {
  const tokenAddress = await input({
    message: "Enter the token address:",
    validate: (input) => {
      if (isAddress(input)) {
        return true;
      }
      return "Please enter a valid address.";
    },
  });

  const amountInput = await input({
    message: "Enter the amount:",
    validate: (input) => {
      const amount = parseFloat(input);
      if (!isNaN(amount) && amount > 0) {
        return true;
      }
      return "Please enter a valid amount.";
    },
  });

  await buyAction(
    account,
    parseEther(amountInput),
    gasBuy,
    slippageBuy,
    tokenAddress as Address,
    deadline
  );

  // await approveAction(account, tokenAddress as Address, gasApprove);

  // Return to main menu after buying
  await mainMenu();
}

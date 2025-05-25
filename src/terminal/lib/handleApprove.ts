import { account } from "./startProgram";
import { gasApprove } from "../variables";
import { approveAction } from "../../blockchain/actions/approve";
import { input } from "@inquirer/prompts";
import type { Address } from "viem/accounts";
import { isAddress } from "viem/utils";

export async function handleApprove() {
  const tokenAddress = await input({
    message: "Enter the token address:",
    validate: (input) => {
      if (isAddress(input)) {
        return true;
      }
      return "Please enter a valid address.";
    },
  });

  await approveAction(account, tokenAddress as Address, gasApprove);
}

import { type Account, type Address, erc20Abi } from "viem";
import { walletClient } from "../../client";

export async function approve(
  account: Account,
  address: Address,
  spender: Address,
  amount: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint
) {
  const approve = await walletClient.writeContract({
    abi: erc20Abi,
    account: account,
    address: address,
    functionName: "approve",
    args: [spender, amount],
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
  });
  return approve;
}

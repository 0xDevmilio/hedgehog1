import { type Address, erc20Abi } from "viem";
import { publicClient } from "../../client";

export async function balanceOf(account: Address, token: Address) {
  const balance = await publicClient.readContract({
    abi: erc20Abi,
    address: token,
    functionName: "balanceOf",
    args: [account],
  });
  return balance;
}

export async function decimals(address: Address) {
  const decimals = await publicClient.readContract({
    abi: erc20Abi,
    address: address,
    functionName: "decimals",
  });
  return decimals;
}

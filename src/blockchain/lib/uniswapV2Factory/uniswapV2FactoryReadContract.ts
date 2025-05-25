import { UNISWAPV2FACTORY } from "../../abi/uniswapV2Factory";
import { publicClient } from "../../client";
import type { Address } from "viem";

export async function getPair(tokenA: Address, tokenB: Address) {
  const getPair = await publicClient.readContract({
    abi: UNISWAPV2FACTORY.abi,
    address: UNISWAPV2FACTORY.address,
    functionName: "getPair",
    args: [tokenA, tokenB],
  });
  return getPair;
}

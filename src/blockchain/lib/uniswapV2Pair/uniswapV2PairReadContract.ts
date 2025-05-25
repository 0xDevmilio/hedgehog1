import { UNISWAPV2PAIR } from "../../abi/uniswapV2Pair";
import { publicClient } from "../../client";
import type { Address } from "viem";

export async function getReserves(address: Address) {
  const getReserves = await publicClient.readContract({
    abi: UNISWAPV2PAIR.abi,
    address: address,
    functionName: "getReserves",
  });
  return getReserves;
}

export async function token0(address: Address) {
  const token0 = await publicClient.readContract({
    abi: UNISWAPV2PAIR.abi,
    address: address,
    functionName: "token0",
  });
  return token0;
}

export async function token1(address: Address) {
  const token1 = await publicClient.readContract({
    abi: UNISWAPV2PAIR.abi,
    address: address,
    functionName: "token1",
  });
  return token1;
}

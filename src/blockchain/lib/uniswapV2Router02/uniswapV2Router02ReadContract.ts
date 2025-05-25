import { UNISWAPV2ROUTER02 } from "../../abi/uniswapV2Router02";
import { publicClient } from "../../client";
import type { Address } from "viem";

export async function getAmountsOut(
  amountIn: bigint,
  tokenIn: Address,
  tokenOut: Address
) {
  const amountsOut = await publicClient.readContract({
    abi: UNISWAPV2ROUTER02.abi,
    address: UNISWAPV2ROUTER02.address,
    functionName: "getAmountsOut",
    args: [amountIn, [tokenIn, tokenOut]],
  });
  return amountsOut[1];
}

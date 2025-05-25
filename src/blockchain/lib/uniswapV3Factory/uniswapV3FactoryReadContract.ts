import type { Address } from "viem/accounts";
import { UNISWAPV3FACTORY } from "../../abi/uniswapV3Factory";
import { publicClient } from "../../client";

export async function getPoolv3(tokenA: Address, tokenB: Address, fee: number) {
  const getPool = await publicClient.readContract({
    abi: UNISWAPV3FACTORY.abi,
    address: UNISWAPV3FACTORY.address,
    functionName: "getPool",
    args: [tokenA, tokenB, fee],
  });
  return getPool;
}

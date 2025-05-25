import type { Address } from "viem/accounts";
import { publicClient } from "../../client";
import { UNISWAPV3POOL } from "../../abi/uniswapV3Pool";

export async function getSlot0(pool: Address) {
  const slot0 = (await publicClient.readContract({
    abi: UNISWAPV3POOL.abi,
    address: pool,
    functionName: "slot0",
  })) as bigint[];
  return slot0[0];
}

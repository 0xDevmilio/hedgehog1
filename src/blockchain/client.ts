import { createPublicClient, createWalletClient, http } from "viem";
import { mainnet } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_ALCHEMY),
});

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(process.env.RPC_ALCHEMY),
});

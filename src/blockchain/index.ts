import { parseEther, type Account } from "viem";
import { buyAction } from "./actions/buy";
import { privateKeyToAccount } from "viem/accounts";
import { getMaxFeePerGas, getmaxPriorityFeePerGas } from "./lib/gas";

// Get Account
const pk = process.env.PRIVATE_KEY;
if (!pk) throw new Error("Error on ENV");

const account = privateKeyToAccount(pk as `0x${string}`);
if (!account) throw new Error("Error on Private Key");

// SOLO V2
buyAction(
  account,
  parseEther("1"), // Cantidad de ETH a comprar
  10, // Multiplicador del gas
  10, // slippage
  "0x0000000000c5dc95539589fbD24BE07c6C14eCa4", // Address de CULT
  25 // Cantidad de segundos antes de que revierta
);

// Ejecutar ---> bun run src/blockchain/index.ts
// Address con la que compras ---> 0x9138E92707bB4352A8acd61Fe2b71593B732906F

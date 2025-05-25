import { retryOperation } from "../../terminal/utils/functions";
import { UNISWAPV2ROUTER02 } from "../abi/uniswapV2Router02";
import { publicClient } from "../client";
import { balanceOf } from "../lib/erc20/erc20ReadContract";
import { approve } from "../lib/erc20/erc20WriteContract";
import { getMaxFeePerGas, getmaxPriorityFeePerGas } from "../lib/gas";
import type { Account, Address } from "viem";

export async function approveAction(
  account: Account,
  approveToken: Address,
  approveGas: number
) {
  if (!account) throw new Error("Private Key Error");

  const tokenBalance = await balanceOf(account.address, approveToken);
  console.log("Approving:", tokenBalance, "Tokens");

  const maxFeePerGas = getMaxFeePerGas(approveGas);
  const maxPriorityFeePerGas = getmaxPriorityFeePerGas(approveGas);

  const approveTx = await approve(
    account,
    approveToken,
    UNISWAPV2ROUTER02.address,
    tokenBalance,
    maxFeePerGas,
    maxPriorityFeePerGas
  );

  console.log("Transaction Sent");

  const approveConfirm = await retryOperation(() =>
    publicClient.waitForTransactionReceipt({ hash: approveTx })
  );
  console.log("Transaction confirmed");
  console.log("https://etherscan.io/tx", approveConfirm.transactionHash);
}

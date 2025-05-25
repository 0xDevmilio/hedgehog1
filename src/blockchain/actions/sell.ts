import { publicClient } from "../client";
import { NATIVETOKEN } from "../constants";
import { balanceOf } from "../lib/erc20/erc20ReadContract";
import { getAmountsOut } from "../lib/uniswapV2Router02/uniswapV2Router02ReadContract";
import { swapExactTokensForETHSupportingFeeOnTransfer } from "../lib/uniswapV2Router02/uniswapV2Router02WriteContract";
import { getMaxFeePerGas, getmaxPriorityFeePerGas } from "../lib/gas";
import { getDeadline, getSlippage } from "../lib/utils";
import type { Account, Address } from "viem";
import { retryOperation } from "../../terminal/utils/functions";

export async function sellAction(
  account: Account,
  sellPercentage: bigint,
  sellGas: number,
  sellSlippage: number,
  sellToken: Address,
  deadline: number
) {
  const _deadline = getDeadline(deadline);

  const totalBalance = await balanceOf(account.address, sellToken);
  const sellBalance = totalBalance * (sellPercentage / 100n);

  const amountsOut = await getAmountsOut(sellBalance, sellToken, NATIVETOKEN);
  const amountsOutWithSlippage = getSlippage(amountsOut, sellSlippage);

  const maxFeePerGas = getMaxFeePerGas(sellGas);
  const maxPriorityFeePerGas = getmaxPriorityFeePerGas(sellGas);

  const sellTx = await swapExactTokensForETHSupportingFeeOnTransfer(
    account,
    sellBalance,
    amountsOutWithSlippage,
    sellToken,
    NATIVETOKEN,
    _deadline,
    maxFeePerGas,
    maxPriorityFeePerGas
  );
  console.log("Transaction Sent");

  const sellConfirm = await retryOperation(() =>
    publicClient.waitForTransactionReceipt({ hash: sellTx })
  );
  console.log("Transaction confirmed", sellConfirm.transactionHash);
}

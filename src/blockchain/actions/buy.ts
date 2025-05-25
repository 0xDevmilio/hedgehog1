import { publicClient } from "../client";
import { NATIVETOKEN } from "../constants";
import { getAmountsOut } from "../lib/uniswapV2Router02/uniswapV2Router02ReadContract";
import { swapExactETHForTokensSupportingFeeOnTransferTokens } from "../lib/uniswapV2Router02/uniswapV2Router02WriteContract";
import { getMaxFeePerGas, getmaxPriorityFeePerGas } from "../lib/gas";
import { getDeadline, getSlippage } from "../lib/utils";
import { formatEther, type Account, type Address } from "viem";
import { retryOperation } from "../../terminal/utils/functions";

export async function buyAction(
  account: Account,
  buyAmount: bigint,
  buyGas: number,
  buySlippage: number,
  buyToken: Address,
  deadline: number
) {
  const _deadline = getDeadline(deadline);

  const amountsOut = await getAmountsOut(buyAmount, NATIVETOKEN, buyToken);

  const amountsOutWithSlippage = getSlippage(amountsOut, buySlippage);
  console.log(
    "Buying",
    formatEther(buyAmount),
    "for",
    amountsOutWithSlippage,
    "Tokens"
  );

  const maxFeePerGas = getMaxFeePerGas(buyGas);
  const maxPriorityFeePerGas = getmaxPriorityFeePerGas(buyGas);

  const buyTx = await swapExactETHForTokensSupportingFeeOnTransferTokens(
    account,
    buyAmount,
    amountsOutWithSlippage,
    NATIVETOKEN,
    buyToken,
    _deadline,
    maxFeePerGas,
    maxPriorityFeePerGas
  );
  console.log("Transaction Sent", buyTx);

  const buyConfirm = await retryOperation(() =>
    publicClient.waitForTransactionReceipt({ hash: buyTx })
  );
  console.log("Transaction confirmed", buyConfirm.transactionHash);
}

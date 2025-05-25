import { UNISWAPV2ROUTER02 } from "../../abi/uniswapV2Router02";
import { walletClient } from "../../client";
import type { Account, Address } from "viem";

export async function swapExactETHForTokens(
  account: Account,
  amount: bigint,
  amountOutMin: bigint,
  tokenIn: Address,
  tokenOut: Address,
  deadline: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint
) {
  const swap = await walletClient.writeContract({
    abi: UNISWAPV2ROUTER02.abi,
    account: account,
    address: UNISWAPV2ROUTER02.address,
    functionName: "swapExactETHForTokens",
    args: [amountOutMin, [tokenIn, tokenOut], account.address, deadline],
    value: amount,
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
  });
  return swap;
}

export async function swapExactETHForTokensSupportingFeeOnTransferTokens(
  account: Account,
  amount: bigint,
  amountOutMin: bigint,
  tokenIn: Address,
  tokenOut: Address,
  deadline: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint
) {
  const swap = await walletClient.writeContract({
    abi: UNISWAPV2ROUTER02.abi,
    account: account,
    address: UNISWAPV2ROUTER02.address,
    functionName: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    args: [amountOutMin, [tokenIn, tokenOut], account.address, deadline],
    value: amount,
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
  });
  return swap;
}

export async function swapExactTokensForETH(
  account: Account,
  amount: bigint,
  amountOutMin: bigint,
  tokenIn: Address,
  tokenOut: Address,
  deadline: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint
) {
  const swap = await walletClient.writeContract({
    abi: UNISWAPV2ROUTER02.abi,
    account: account,
    address: UNISWAPV2ROUTER02.address,
    functionName: "swapExactTokensForETH",
    args: [
      amount,
      amountOutMin,
      [tokenIn, tokenOut],
      account.address,
      deadline,
    ],
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
  });
  return swap;
}

export async function swapExactTokensForETHSupportingFeeOnTransfer(
  account: Account,
  amount: bigint,
  amountOutMin: bigint,
  tokenIn: Address,
  tokenOut: Address,
  deadline: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint
) {
  const swap = await walletClient.writeContract({
    abi: UNISWAPV2ROUTER02.abi,
    account: account,
    address: UNISWAPV2ROUTER02.address,
    functionName: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    args: [
      amount,
      amountOutMin,
      [tokenIn, tokenOut],
      account.address,
      deadline,
    ],
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
  });
  return swap;
}

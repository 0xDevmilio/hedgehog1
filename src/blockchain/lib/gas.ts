import { publicClient } from "../client";

const { maxFeePerGas, maxPriorityFeePerGas } =
  await publicClient.estimateFeesPerGas();

export function getMaxFeePerGas(multiplier: number) {
  const _maxFeePerGas = maxFeePerGas * BigInt(multiplier);
  return _maxFeePerGas;
}

export function getmaxPriorityFeePerGas(multiplier: number) {
  const _maxPriorityFeePerGas = maxPriorityFeePerGas * BigInt(multiplier);
  return _maxPriorityFeePerGas;
}

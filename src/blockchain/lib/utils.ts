export function getDeadline(seconds: number) {
  const deadline = BigInt(Math.floor(Date.now() / 1000) + seconds);
  return deadline;
}

export function getSlippage(amountsOut: bigint, slippage: number) {
  const slippagex10 = BigInt(slippage * 10);
  const math = (amountsOut / 1000n) * (1000n - slippagex10);
  return math;
}

// Calculation for Uniswap V3 swap with slot 0
export function sqrtPrice(
  sqrtPriceX96: bigint,
  decimalsToken0: number,
  decimalsToken1: number
): number {
  const Q96 = 2n ** 96n;
  const priceX192 = sqrtPriceX96 * sqrtPriceX96;

  const decimalAdjustment = 10n ** BigInt(decimalsToken0 - decimalsToken1);

  const Q192 = Q96 * Q96;
  const priceAdjusted = priceX192 * decimalAdjustment * 10n ** 18n;
  const price = priceAdjusted / Q192;

  return Number(price) / 1e18;
}

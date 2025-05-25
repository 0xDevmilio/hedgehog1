/**
 * Executes a function with retries and delay
 * @param operation The function to execute
 * @param maxRetries Maximum number of retry attempts
 * @param delay Delay between retries in milliseconds
 * @param backoffFactor Factor to increase delay with each retry (optional)
 * @returns A promise that resolves with the operation result or rejects if all retries fail
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 500,
  backoffFactor: number = 1
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= backoffFactor;
      }
    }
  }

  throw new Error(
    `Operation failed after ${maxRetries} attempts. Last error: ${lastError?.message}`
  );
}

/**
 * Executes a function and automatically handles errors
 * @param operation The function to execute
 * @returns The result of the operation, or null if an error occurred
 */
export async function safeExecute<T>(
  operation: () => Promise<T>
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

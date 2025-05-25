import { db } from "..";
import type { Data } from "../variables";
import { password } from "@inquirer/prompts";
import crypto from "crypto";

// Function to prompt for password and unlock the private key
export async function unlockPrivateKey() {
  const passwordInput = await password({
    message: "Enter your password to unlock your account:",
  });

  try {
    const decryptedKey = decrypt(
      (db.data as Data).settings.privateKey,
      passwordInput
    );
    console.log("Account unlocked");
    return decryptedKey;
  } catch (error) {
    console.error("Invalid password. Could not unlock the private key.");
    process.exit(1);
  }
}

// Function to encrypt a private key
export function encrypt(text: string, password: string): string {
  const key = crypto.scryptSync(password, "jootscammer", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

// Function to decrypt a private key
export function decrypt(text: string, password: string): string {
  const [ivHex, encryptedText] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const key = crypto.scryptSync(password, "jootscammer", 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

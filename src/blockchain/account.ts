import { privateKeyToAccount, type Address } from "viem/accounts";
import dotenv from "dotenv";

dotenv.config();

const pk = process.env.PRIVATE_KEY;
if (!pk) throw new Error("Error with ENV");

export const account = privateKeyToAccount(pk as Address);
if (!pk) throw new Error("Error with Account Creation");

import type { Account } from "viem/accounts";
import { db } from ".";

// Define types for the database schema
export type Data = {
  version: string;
  settings: {
    privateKey: string;
    deadline: number;
    gasApprove: number;
    gasBuy: number;
    gasSell: number;
    slippageBuy: number;
    slippageSell: number;
    accessCode: string;
  };
};

export let currentVersion: string;
export let account: Account;
export let deadline: number;
export let gasApprove: number;
export let gasBuy: number;
export let gasSell: number;
export let slippageBuy: number;
export let slippageSell: number;
export let accessCode: string;

export function assignVariables() {
  const data = db.data as Data;
  currentVersion = data.version;
  deadline = data.settings.deadline;
  gasApprove = data.settings.gasApprove;
  gasBuy = data.settings.gasBuy;
  gasSell = data.settings.gasSell;
  slippageBuy = data.settings.slippageBuy;
  slippageSell = data.settings.slippageSell;
  accessCode = data.settings.accessCode;
}

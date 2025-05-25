import { accessResponse, registerResponse } from "../schema/schema";

export async function checkAccess(walletAddress: string, accessCode: string) {
  try {
    const response = await fetch("https://hedgehog-auth.up.railway.app/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress: walletAddress,
        accessCode: accessCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error checking access: ${response.status}`);
    }

    const data = await response.json();
    const parsedData = accessResponse.parse(data);
    return parsedData.allowed;
  } catch (error) {
    console.error("Error checking access");
    return false;
  }
}

export async function registerAccess(
  walletAddress: string,
  accessCode: string
) {
  try {
    const response = await fetch(
      "https://hedgehog-auth.up.railway.app/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: walletAddress,
          accessCode: accessCode,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to register access");
    }
    const data = await response.json();
    const parsedData = registerResponse.parse(data);
    return parsedData.response;
  } catch (error) {
    console.error("Error making request:", error);
    return false;
  }
}

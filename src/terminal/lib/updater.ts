import { input } from "@inquirer/prompts";
import { db } from "..";
import axios from "axios";
import fs from "fs";
import os from "os";
import { currentVersion, type Data } from "../variables";

export async function checkForUpdates() {
  const repoOwner = "sm-tracking"; // Replace with the repository owner's username
  const repoName = "HedgeHog"; // Replace with the repository name

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = (await response.json()) as any;

    const latestVersion = data.tag_name;

    if (latestVersion !== `v${currentVersion}`) {
      console.log(
        `Update available: ${latestVersion}. You are using ${currentVersion}.`
      );
      const update = await input({
        message: "Do you want to update? (y/n)",
      });
      if (update === "y") {
        console.log("Updating. Please wait...");
        await downloadLatestRelease(data);
        console.log(
          "Update completed. Please restart the application to apply the update."
        );
        process.exit(0);
      }
    } else {
      console.log("You are using the latest version.");
    }
  } catch (error) {
    console.error("Error checking for updates:", error);
  }
}

export async function downloadLatestRelease(releaseData: any) {
  try {
    const asset2 = releaseData.assets[0];
    const platform = os.platform();
    let asset;

    if (platform === "win32") {
      asset = releaseData.assets[2];
    } else if (platform === "darwin") {
      asset = releaseData.assets[1];
    } else if (platform === "linux") {
      asset = releaseData.assets[0];
    }

    const downloadUrl = asset.url;
    const fileName = asset.name;
    const tempFileName = `${fileName}.tmp`;

    const key = process.env.GITHUB_TOKEN;
    const authHeaders = {
      Authorization: `Token ${key}`,
    };

    const response = await axios({
      method: "get",
      url: downloadUrl,
      responseType: "stream",
      headers: {
        Accept: "application/octet-stream",
        ...authHeaders,
      },
    });
    const writer = fs.createWriteStream(tempFileName);
    await response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(tempFileName);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        try {
          fs.renameSync(tempFileName, fileName);
          const data = db.data as Data;
          data.version = releaseData.tag_name.replace("v", "");
          await db.write();
          console.log(`Downloaded the latest release`);
          resolve(1);
        } catch (err) {
          reject(err);
        }
      });

      writer.on("error", (err) => {
        console.error("Error writing the file:", err);
        fs.unlinkSync(tempFileName); // Clean up the temp file
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error downloading latest release:", error);
  }
}

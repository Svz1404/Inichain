import { ethers } from "ethers";
import cfonts from "cfonts";
import readline from "readline";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const RPC_URL = "https://rpc-testnet.inichain.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Load private key from .env
const LOOP_INTERVAL = 1 * 60 * 1000; // 1 minute in milliseconds

// Validate private key
if (!PRIVATE_KEY) {
  console.error("\x1b[31mError: PRIVATE_KEY is not set in the .env file.\x1b[0m");
  process.exit(1);
}

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Styled log helper
function styledLog(message, color = "\x1b[36m") {
  console.log(`${color}%s\x1b[0m`, message);
}

// Generate a random address
function getRandomAddress() {
  return ethers.Wallet.createRandom().address;
}

// CLI prompt helper
function promptQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(query, (answer) => {
    rl.close();
    resolve(answer);
  }));
}

// Send ether
async function sendEther(toAddress, amount) {
  try {
    styledLog(`Sending ether to: ${toAddress}`, "\x1b[32m");

    // Create transaction
    styledLog("\nSending transaction...");
    const tx = await wallet.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amount),
    });
    styledLog(`Transaction sent! Hash: ${tx.hash}`, "\x1b[36m");

    // Wait for confirmation
    styledLog("\nWaiting for confirmation...\n");
    const receipt = await tx; // Wait for at least 1 block confirmation

    if (receipt) {
      styledLog("\u2705 Transaction Confirmed!", "\x1b[32m");
    } else {
      styledLog("\u274c Transaction not yet confirmed", "\x1b[31m");
    }
  } catch (error) {
    console.error("\x1b[31mError sending ether:\x1b[0m", error.message);
  }
}

// Main process
async function main() {
  cfonts.say("NT Exhaust", {
    font: "block",
    align: "center",
    colors: ["cyan", "magenta"],
    background: "black",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
  });

  styledLog("=== Telegram Channel : NT Exhaust (@NTExhaust) ===", "\x1b[36m");

  const choice = await promptQuestion(
    "Choose an option:\n1. Send to a random address\n2. Send to a specific address\nEnter your choice (1 or 2): "
  );

  let recipient;
  const isRandomAddress = choice === "1";

  if (isRandomAddress) {
    styledLog("Selected: Random Address", "\x1b[33m");
  } else if (choice === "2") {
    recipient = await promptQuestion("Enter the recipient address: ");
    styledLog(`Selected: Specific Address -> ${recipient}`, "\x1b[33m");
  } else {
    console.log("Invalid choice. Exiting...");
    return;
  }

  const amount = await promptQuestion("Enter the amount of ether to send: ");
  const loopCount = parseInt(
    await promptQuestion("Enter how many times to repeat (loop count): "),
    10
  );

  for (let i = 0; i < loopCount; i++) {
    styledLog(`\n[Loop ${i + 1}/${loopCount}]`, "\x1b[35m");

    // Generate a new random address for each transaction if random address option is selected
    if (isRandomAddress) {
      recipient = getRandomAddress();
      styledLog(`Generated random address: ${recipient}`, "\x1b[34m");
    }

    await sendEther(recipient, amount);

    if (i < loopCount - 1) {
      styledLog(`Waiting for 1 minute before the next transaction...`, "\x1b[33m");
      await new Promise((resolve) => setTimeout(resolve, LOOP_INTERVAL));
    }
  }

  styledLog("\nAll tasks completed! Exiting script.", "\x1b[32m");
}

// Run the script
main();

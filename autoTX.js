import { ethers } from "ethers";
import cfonts from "cfonts";
import readline from "readline";

// Configuration
const RPC_URL = "https://rpc-testnet.inichain.com";
const TOKEN_A_ADDRESS = "0xfbECae21C91446f9c7b87E4e5869926998f99ffe";
const PRIVATE_KEY = "PRIVATEKEY"; // Replace with your private key
const AMOUNT_TO_SEND = "0.0001"; // Amount of tokens to send (in token's smallest unit)
const LOOP_INTERVAL = 1 * 60 * 1000; // 1 minutes in milliseconds

// ABI for ERC-20 token (minimum required functions)
const ERC20_ABI = [
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function decimals() view returns (uint8)",
];

// Initialize provider, wallet, and token contract
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const tokenContract = new ethers.Contract(TOKEN_A_ADDRESS, ERC20_ABI, wallet);

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

// Send tokens
async function sendToken(toAddress, decimals, amount) {
  try {
    styledLog(`Sending tokens to: ${toAddress}`, "\x1b[32m");

    // Send transaction
    styledLog("\nSending transaction...");
    const tx = await tokenContract.transfer(toAddress, amount);
    styledLog(`Transaction sent! Hash: ${tx.hash}`, "\x1b[36m");

    // Wait for confirmation
    styledLog("\nWaiting for confirmation...\n");
    const receipt = await tx.wait(1); // Wait for at least 1 block confirmation

    if (receipt) {
      styledLog("✅ Transaction Confirmed!", "\x1b[32m");
    } else {
      styledLog("❌ Transaction not yet confirmed", "\x1b[31m");
    }
  } catch (error) {
    console.error("\x1b[31mError sending token:\x1b[0m", error.message);
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
  if (choice === "1") {
    styledLog("Selected: Random Address", "\x1b[33m");
    recipient = getRandomAddress();
  } else if (choice === "2") {
    recipient = await promptQuestion("Enter the recipient address: ");
    styledLog(`Selected: Specific Address -> ${recipient}`, "\x1b[33m");
  } else {
    console.log("Invalid choice. Exiting...");
    return;
  }

  const decimals = await tokenContract.decimals();
  const amount = ethers.parseUnits(AMOUNT_TO_SEND, decimals);

  const loopCount = parseInt(
    await promptQuestion("Enter how many times to repeat (loop count): "),
    10
  );

  for (let i = 0; i < loopCount; i++) {
    styledLog(`\n[Loop ${i + 1}/${loopCount}]`, "\x1b[35m");
    await sendToken(recipient, decimals, amount);
    if (i < loopCount - 1) {
      styledLog(`Waiting for 1 minutes before the next transaction...`, "\x1b[33m");
      await new Promise((resolve) => setTimeout(resolve, LOOP_INTERVAL));
    }
  }

  styledLog("\nAll tasks completed! Exiting script.", "\x1b[32m");
}

// Run the script
main();

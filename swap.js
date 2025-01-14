import { ethers } from "ethers";
import dotenv from "dotenv";
import cfonts from 'cfonts';
dotenv.config();

// Load environment variables
const {
  PRIVATE_KEY,       // Wallet private key
  RPC_URL,           // RPC endpoint of the blockchain
  ROUTER_ADDRESS,    // Address of the DEX router contract
  TOKEN_A_ADDRESS,   // WINI token address
  TOKEN_B_ADDRESS,   // USDT token address
} = process.env;

if (!PRIVATE_KEY || !RPC_URL || !ROUTER_ADDRESS || !TOKEN_A_ADDRESS || !TOKEN_B_ADDRESS) {
  console.error("⚠️ Missing required environment variables. Check your .env file.");
  process.exit(1);
}

// Setup provider, wallet, and router contract
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ERC-20 ABI
const tokenAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function approve(address spender, uint256 amount) external returns (bool)", // Approve function
];

// Contract instances for TOKEN_A and TOKEN_B
const tokenA = new ethers.Contract(TOKEN_A_ADDRESS, tokenAbi, wallet);
const tokenB = new ethers.Contract(TOKEN_B_ADDRESS, tokenAbi, wallet);

// Router ABI (DEX router functions)
const routerAbi = [
  "function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory)",
  "function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory)",
];

const routerContract = new ethers.Contract(ROUTER_ADDRESS, routerAbi, wallet);

async function performSwap(fromToken, toToken, amountIn) {
  try {
    // Fetch token decimals
    const decimalsA = await tokenA.decimals();
    const decimalsB = await tokenB.decimals();
    
    // Convert amountIn to BigInt with proper decimals
    const amountInBigInt = ethers.parseUnits(amountIn.toString(), decimalsA);

    console.log(`\n🪙 Amount In (formatted): ${ethers.formatUnits(amountInBigInt, decimalsA)} ${fromToken}`);
    
    // Get the balances before the swap
    const balanceABefore = await tokenA.balanceOf(wallet.address);
    const balanceBBefore = await tokenB.balanceOf(wallet.address);
    console.log(`\n📊 Balance of Token A (WINI) before swap: ${ethers.formatUnits(balanceABefore, decimalsA)} WINI`);
    console.log(`📊 Balance of Token B (USDT) before swap: ${ethers.formatUnits(balanceBBefore, decimalsB)} USDT`);

    const path = [fromToken, toToken]; // Path of the token swap
    const to = wallet.address; // Destination address (your wallet)
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

    // Get minimum amountOut using getAmountsOut
    const amountsOut = await routerContract.getAmountsOut(amountInBigInt, path);
    if (!amountsOut || amountsOut.length < 2) {
      throw new Error("❌ Unexpected response from getAmountsOut");
    }

    console.log(`\n💰 Amount Out (estimated): ${ethers.formatUnits(amountsOut[1], decimalsB)} ${toToken}`);

    // 5% slippage tolerance
    const amountOutMin = amountsOut[1] * BigInt(95) / BigInt(100);
    console.log(`💥 Amount Out Min (with slippage): ${ethers.formatUnits(amountOutMin, decimalsB)} ${toToken}`);

    // Retry approval until it's confirmed
    let approvalConfirmed = false;
    let approvalRetries = 0;
    const maxRetries = 5;

    while (!approvalConfirmed && approvalRetries < maxRetries) {
      try {
        const approveTx = await tokenA.approve(ROUTER_ADDRESS, amountInBigInt);
        console.log(`✔️ Approval transaction hash: ${approveTx.hash}`);
        await approveTx.wait();
        console.log("✅ Approval confirmed.");
        approvalConfirmed = true;
      } catch (error) {
        approvalRetries++;
        console.error(`⚠️ Approval failed. Retrying (${approvalRetries}/${maxRetries})...`);
        if (approvalRetries >= maxRetries) {
          throw new Error("❌ Max retries reached for approval. Exiting.");
        }
      }
    }

    // Perform the swap after successful approval
    if (approvalConfirmed) {
      const swapTx = await routerContract.swapExactTokensForTokens(
        amountInBigInt,
        amountOutMin,
        path,
        to,
        deadline, 
        {
          gasLimit: 136195, // Adjust the gas limit
          gasPrice: ethers.parseUnits("10", "gwei") // Adjust the gas price
        }
      );
      console.log(`\n🔄 Swap transaction hash: ${swapTx.hash}`);
      console.log("⏳ Waiting for transaction confirmation...");
      const receipt = await swapTx.wait();
      console.log("✅ Swap confirmed:", receipt.transactionHash);

      // Get balances after the swap
      const balanceAAfter = await tokenA.balanceOf(wallet.address);
      const balanceBAfter = await tokenB.balanceOf(wallet.address);
      console.log(`\n📊 Balance of Token A (WINI) after swap: ${ethers.formatUnits(balanceAAfter, decimalsA)} WINI`);
      console.log(`📊 Balance of Token B (USDT) after swap: ${ethers.formatUnits(balanceBAfter, decimalsB)} USDT`);

      // Log the token transfers to confirm the success
      console.log("\n📝 Tokens Transferred:");
      // receipt.logs.forEach(log => {
      //   console.log(log);
      // });
    } else {
      console.error("❌ Approval was not confirmed after retries.");
    }

  } catch (error) {
    console.error("⚠️ Error during swap:", error);
  }
}

async function startSwapOnce() {
    console.log("\n⏳ Starting swap once...");
    try {
      console.log("🔄 Swapping Token A (WINI) to Token B (USDT)...");
      await performSwap(TOKEN_A_ADDRESS, TOKEN_B_ADDRESS, "0.001"); // Replace 0.001 with the desired amount
    } catch (error) {
      console.error("❌ Error in swap:", error);
    }
}
  
// Loop the swap every 10 minutes (600000 milliseconds)
cfonts.say('NT Exhaust', {
    font: 'block',        // Options: 'block', 'simple', '3d', etc.
    align: 'center',
    colors: ['cyan', 'magenta'],
    background: 'black',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
  });
console.log("=== Telegram Channel : NT Exhaust ( @NTExhaust ) ===")
await startSwapOnce();

setInterval(async () => {
  await startSwapOnce();
}, 600000); // 10 minutes

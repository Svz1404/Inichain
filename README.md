![image](https://github.com/user-attachments/assets/0d9677db-1f18-430a-b66c-a4c4b986a56a)
🚀 Auto Transaction INI
Auto Transaction script for Inichain that automates SWAPs on the Inichain Testnet.

Note: Simply fill in your private key in the .env file, install dependencies, and run the script.
Make sure you have WINI tokens in your wallet before starting.

✨ Features
Automatic transactions on the Inichain testnet.
Option to send to random or specific addresses.
Includes delay and confirmation for secure transactions.
🔧 Installation & Setup
1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/Svz1404/Inichain.git
cd Inichain
2️⃣ Create a .env File
Create a .env file with the following format:

bash
Copy code
PRIVATE_KEY=YOURPRIVATEKEY
RPC_URL=https://rpc-testnet.inichain.com
ROUTER_ADDRESS=0x4ccB784744969D9B63C15cF07E622DDA65A88Ee7
TOKEN_A_ADDRESS=0xfbECae21C91446f9c7b87E4e5869926998f99ffe
TOKEN_B_ADDRESS=0xcF259Bca0315C6D32e877793B6a10e97e7647FdE
Replace YOURPRIVATEKEY with your wallet's private key.
Save the file with: CTRL + X + Y + ENTER.
3️⃣ Install Dependencies
Run the following commands to install required modules:

bash
Copy code
npm install ethers
npm install dotenv
npm install cfonts
4️⃣ Run the Script
Before running, make sure you have WINI tokens in your wallet.

Run the script using:

bash
Copy code
node index.js
🖥️ Run on Background
To keep the script running in the background:

Create a new screen session:
bash
Copy code
screen -S inichain
Run the script in the session:
bash
Copy code
node index.js
Detach the screen by pressing: CTRL + A + D.
📌 Example Output
plaintext
Copy code
NT Exhaust
=== Telegram Channel : NT Exhaust (@NTExhaust) ===

Choose an option:
1. Send to random addresses
2. Send to specific addresses
Enter your choice (1 or 2): 1

[Loop 1/100]
Generated random address: 0xAbc123...567
Sending transaction...
Transaction sent! Hash: 0x123456abcde
Waiting for confirmation...
✅ Transaction Confirmed!
Waiting for 4 minutes before the next transaction...
💡 Notes
Ensure you have sufficient WINI tokens in your wallet before starting.
Test thoroughly before deploying on the mainnet.
📢 Community
Telegram: NT Exhaust
💙 Credits
This script is developed and maintained by the NT Exhaust team. Contributions are welcome!

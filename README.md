**🚀 Auto Transaction INI**<br>
Auto Transaction script for Inichain that automates SWAPs on the Inichain Testnet.

Note: Simply fill in your private key in the .env file, install dependencies, and run the script.
Make sure you have WINI tokens in your wallet before starting.

**✨ Features**<br>
Automatic transactions on the Inichain testnet.
Option to send to random or specific addresses.
Includes delay and confirmation for secure transactions.

**🔧 Installation & Setup**<br>
1️⃣ Clone the Repository<br>
```
git clone https://github.com/Svz1404/Inichain.git
```
```
cd Inichain
```
<br>

2️⃣ Create a .env File<br>

```
PRIVATE_KEY=YOURPRIVATEKEY
RPC_URL=https://rpc-testnet.inichain.com
ROUTER_ADDRESS=0x4ccB784744969D9B63C15cF07E622DDA65A88Ee7
TOKEN_A_ADDRESS=0xfbECae21C91446f9c7b87E4e5869926998f99ffe
TOKEN_B_ADDRESS=0xcF259Bca0315C6D32e877793B6a10e97e7647FdE
```

3️⃣ Install Dependencies
```
npm install ethers
npm install dotenv
npm install cfonts
```

4️⃣ Run the Script on Background
```
screen -S inichain
```

```
node index.js
```


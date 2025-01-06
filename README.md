Auto SWAP Candy Inichain

First Download the file
- **git clone https://github.com/Svz1404/Inichain.git**
and then 
- **cd Inichain**
make a file .env
- **nano .env**
fill the format
**PRIVATE_KEY=YOURPRIVATEKEY 
RPC_URL=https://rpc-testnet.inichain.com 
ROUTER_ADDRESS=0x4ccB784744969D9B63C15cF07E622DDA65A88Ee7
TOKEN_A_ADDRESS=0xfbECae21C91446f9c7b87E4e5869926998f99ffe TOKEN_B_ADDRESS=0xcF259Bca0315C6D32e877793B6a10e97e7647FdE**
 Save 
**CTRL + X + Y + ENTER**

make a screen for always running on background
**screen -S inichain**
and then install all module
**npm install ethers**
**npm install dotenv**
**npm install cfonts**

Before you running the script, make sure you a WINI token on your wallet(Check the video)
run your script
**node index.js**

Done, thanks!

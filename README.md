![image](https://github.com/user-attachments/assets/0d9677db-1f18-430a-b66c-a4c4b986a56a)
**Auto Transaction INI
Just Fill Your private key on autoTx.js
and run it**

Auto SWAP Candy Inichain

First Download the file
- **git clone https://github.com/Svz1404/Inichain.git**
and then 
- **cd Inichain**
make a file .env
- **nano .env**
fill the format

PRIVATE_KEY=YOURPRIVATEKEY<br>
RPC_URL=https://rpc-testnet.inichain.com<br>
ROUTER_ADDRESS=0x4ccB784744969D9B63C15cF07E622DDA65A88Ee7<br>
TOKEN_A_ADDRESS=0xfbECae21C91446f9c7b87E4e5869926998f99ffe<br>
TOKEN_B_ADDRESS=0xcF259Bca0315C6D32e877793B6a10e97e7647FdE<br>
![image](https://github.com/user-attachments/assets/c4eeb652-9a58-4789-9bd5-f03e806c5653)


 Save 
 
**CTRL + X + Y + ENTER**

make a screen for always running on background

**screen -S inichain**

and then install all module

**npm install ethers**

**npm install dotenv**

**npm install cfonts**


**Before you running the script, make sure you have a WINI token on your wallet(Check the video)**
run your script

**node index.js**

Done, thanks!

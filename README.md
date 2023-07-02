======================================================      
# 	BLOCK CHAIN BASED VOTING SYSTEM		                 
## 		CEC/CS/2022/P07			                               
### 	CANARA ENGINEERING COLLEGE MANGALORE	             
ADITHYA PAI B			                                
		GG ASHWIN PRABHU 		                              
		K KESHAVA BHAT			                                
		M PRAJWAL KINI			                                
						                                              
======================================================      


CONTENTS:

0. DESCRIPTION
1. SYSTEM WORKFLOW
2. SETUP
	- REQUIREMENTS
	- INSTALLING THE ENVIROMENT
3. CONFIGURING THE PROJECT
4. DEPLOYMENT


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
0. DESCRIPTION

### BlockChain Based Voting 
This project is a Final Year project From CEC/CS/P07 Group. It provides a secure and decentralized voting system based on blockchain technology. 
The application ensures that the voting process is transparent, immutable, and secure.


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
1. SYSTEM WORKFLOW

### A brief explanation on the basic workflow of the application:
* Admin will create a voting instance by launching/deploying the system in a blockchain network (EVM), then create an election instance and start the election with the details 		  of the election filled in (including candidates for voters to vote).
* Then the likely voters connect to the same blockchain network register to become a voter. Once the users successfully register, their respective details are sent/displayed in 	  the admins' panel (i.e. verification page).
* The admin then will check if the registration information (blockchain account address, name, and phone number) is valid and matches with his record. If yes, then the admin 		  	  approves the registered user making them eligible to take part and cast their respective vote in the election.
* The registered user (voter) following the approval from the admin casts their vote to the candidate of interest (from the voting page).
* After some time, depending on the scale of the election the admin ends the election. As that happens the voting is closed and the results are displayed announcing the winner 	  	  at the top of the results page.

===== REQUIREMENTS=====

Node.js
Truffle
Ganache (Cli)
Metamask (Browser Extension)

*THE FOLLOWING FILES CAN BE FOUND IN THIS CD 


===== SETUP ENVIROMENT======

01. Install node-v18.16.0-x64.msi from Setup Files
02. Install Ganache-2.7.1-win-x64.appx from Setup Files
03. Install Truffle using command prompt (Powershell) using the command `npm install -g truffle`
04. Install Metamask on Chrome using the link https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn and login to it
05. Open Ganache run A workflow and note down the RPC Port URL 
06. Edit the truffleconfig.js based on this note
07. Connect Meta Mask To the Ganache local Network and Import an Account using the a Private key from Ganache
08. Install the client dependencies, Goto client folder and type `npm i ` in the terminal (This will take 3-10 mins)
08. Go to the client folder and start the front End Application using the command `npm run start`
09. Open A new terminal and start the Verification Application using the command `cd ../API/ && npm i && node app.js`
10. Open your browser and goto `http://localhost:3000`


====== Setup Briefed======

Install truffle and ganache-cli using node packager manager (npm)

`npm install -g truffle`
`npm install -g ganache-cli`

Install [metamask](https://metamask.io/) browser extension


Configuring the project for development
Open The source Code

`cd Eth-Voting`

Run local Ethereum blockchain
ganache-cli
Note: Do not close ganache-cli (the blockchain network needs to be running all the time) or Open The Ganache Application

Configure metamask on the browser with the following details

New RPC URL: `http://127.0.0.1:8545` (use port: 7545 for ganache gui, update it in the file:truffle-config.js as well)

Chain ID: 1337

Import account(s) using private keys from ganache-cli to the metamask extension on the browser

Deploy smart contract to the (local) blockchain network (i.e ganache-cli)

# on the dVoting directory
`truffle migrate`
Note: Use truffle migrate --reset for re-deployments

Launch the development server (frontend)

`cd client`
`npm install`
`npm start`

If you encounter error during npm install, please note that you might need to install Microsoft Visual C++ Redistributable packages from learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist (here is the direct download link for X64: aka.ms/vs/17/release/vc_redist.x64.exe)

To run the verification Client Application

`cd ../API/`
`npm i`
`node app.js`



4.DEPLOYMENT


Open `http://localhost:3000` for Voting booth application.
Open` http://localhost:3001` for Voting verification Application.


-readme.txt by ADITHYA PAI B



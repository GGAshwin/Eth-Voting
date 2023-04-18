const express = require('express');
const app = express();
const path = require('path');
const Web3 = require('web3');
const cors = require('cors')
const ElectionContract = require('../client/src/contracts/Election.json');

app.use(cors())
// Connect to Ganache
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

// Get the contract instance
const contractAddress = '0x0264fb68511E404E5EbCBFAB1E8003bac5C906f0';
const electionContract = new web3.eth.Contract(ElectionContract.abi, contractAddress);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/voterDetails', async (req, res) => {
    //   const voterAddress = req.query.address;
    const accounts = await web3.eth.getAccounts();
    const voterAddress = accounts[1];
    console.log(voterAddress);
    try {
        const voter = await electionContract.methods.voterDetails(voterAddress).call();
        if (voter.hasVoted) {
            res.json({ 'msg': `You have voted for candidate ${voter.name}` });
        } else {
            res.send('You have not voted yet.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong.');
    }
});

app.get('/get-address', async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    const voterAddress = accounts[0];

    res.send(voterAddress);
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
const express = require('express');
const app = express();
const path = require('path');
const Web3 = require('web3');
const cors = require('cors')
const ElectionContract = require('../client/src/contracts/Election.json');

app.use(cors())
app.use(express.json())
// Connect to Ganache
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

// Get the contract instance
const contractAddress = '0x3b4007F5f09eEAb5c9249067dBD5d35c8b01014d';
const electionContract = new web3.eth.Contract(ElectionContract.abi, contractAddress);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/voterDetails', async (req, res) => {
    //   const voterAddress = req.query.address;
    const accounts = await web3.eth.getAccounts();
    const voterAddress = accounts[1];
    console.log('get ', voterAddress);
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

app.post('/voterDetails', async (req, res) => {
    const voterAddress = req.body.address;
    try {
        const voter = await electionContract.methods.voterDetails(voterAddress).call();
        if (voter.hasVoted) {
            console.log(voter);

            const candidateId = voter.votedCandidateId;
            electionContract.methods.getCandidateName(candidateId).call((error, result) => {
                if (error) {
                    console.error('Error:', error);
                } else {
                    console.log('Candidate Name:', result);
                    res.json({ 'msg': `You have voted for candidate ${result}` });
                }
            });

        } else {
            console.log('here');
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
    console.log(accounts[0]);
    res.json({ voterAddress });
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
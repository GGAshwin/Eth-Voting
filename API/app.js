const express = require('express');
const app = express();
const path = require('path');
const Web3 = require('web3');
const cors = require('cors')
const ElectionContract = require('../client/src/contracts/Election.json');

require('dotenv').config({ path: path.join(__dirname, '../.env')});
console.log(process.env.IP)

app.use(cors())
app.use(express.json())
// Connect to Ganache
// const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${process.env.IP}:7545`));

// Get the contract instance
// get the contract address from the truffle deployment
const config = require("../src/config.json");
const { network, contractAddress } = config;
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
        console.log(voter);
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
                    res.json({ 'msg': `You have voted for candidate <b>${result}</b>` });
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

app.get('/results', async (req, res) => {
    try {
      // Call the contract function to retrieve the election results
      const candidates = [];
      const candidateCount = await electionContract.methods.getTotalCandidate().call();
      for (let i = 1; i <= candidateCount; i++) {
        const candidate = await electionContract.methods.candidateDetails(i - 1).call();
        candidates.push({
          id: candidate.candidateId,
          header: candidate.header,
          slogan: candidate.slogan,
          voteCount: candidate.voteCount
        });
      }
  
      // Format the results data into a JSON object
      const results = {
        candidates: candidates,
        totalCandidates: candidateCount
      };
      // send only candidate name and vote count
        const c = [];
        for (let i = 0; i < results.candidates.length; i++) {
            c.push({
                name: results.candidates[i].header,
                voteCount: results.candidates[i].voteCount
            });
        }
                
  
      // Send the JSON response
      res.send(c);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving election results');
    }
  });

app.get("/result", async (req, res) => {
    // res.sendFile(path.join(__dirname, 'results.html'));
    res.send(` 
    <!DOCTYPE html>
<html lang="en">

<head>
    <title>Results</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <style>
        @import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'poppins', sans-serif;
        }

        body {
            background: #E8F9FD;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            border: 1px solid #ddd;
            outline: none;
            background-color: #181818;
            color: #ddd;
        }

        h1 {
            color: #000;
            text-align: center;
            font-size: 2em;
            margin-bottom: 1em;

        }

        th,
        td {
            text-align: left;
            padding: 8px;
            border: none;
            outline: none;
            color: black;
            border: 1px solid #ddd;
        }


        th {
            background-color: #000;
            color: white;
           

            
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        a{
            color: #4d2ff4;
            text-decoration: underline;
            font-weight: 500;
        }


    </style>
</head>

<body>
    <div class="container">
        <h1>Results</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Votes</th>
                </tr>
            </thead>
            <tbody id="table-body"></tbody>
        </table>

        <div style="margin-top: 2em; width: 100%; text-align: center;">
            <a href="/">Verify Your Vote</a>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

    <script>
        const f = async () => {
           try{
            const res = await fetch('http://${process.env.IP}:3001/results');
            const json = await res.json();
            console.log(json);
            const winner = json.reduce((max, candidate) => { return parseInt(candidate.voteCount) > parseInt(max.voteCount) ? candidate : max; });
            let html = "";
            for (const candidate of json) {
                const isWinner = candidate.name === winner.name;
                const rowColor = isWinner ? "#59CE8F" : "#E8F9FD";
                html = html + "<tr style='background: "+rowColor+" '><td>" + candidate.name + "</td><td>" + candidate.voteCount + "</td></tr>";

            }
            document.getElementById("table-body").innerHTML = html;
           }
              catch(err){
                console.log(err);
                alert("Results have not been published yet. Please try again later.")
              }
        }
        f()
    </script>

</body>

</html>
    `)
   
})

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
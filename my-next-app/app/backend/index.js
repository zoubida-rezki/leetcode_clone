
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const PythonShell = require('python-shell').PythonShell;
const port = 80; // Use a different port to avoid conflict with Next.js

app.use(cors());
app.use(express.json());

app.post('/python', (req, res) => {
    fs.writeFileSync('test.py',req.body.code)

        let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        args: [1,2,3]
        };

        PythonShell.run('test.py', options).then(messages=>{
            // results is an array consisting of messages collected during execution
            console.log('results: %j', messages);
            console.log('results: %j', messages[0]);
            res.json({passOrFail : messages[0]});
          });

    // res.json({ message: 'success' });
});

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});

// https://www.youtube.com/watch?v=aXXZwyeTJ98&list=TLPQMDIwNjIwMjQOJzH6HjLM7Q&index=3
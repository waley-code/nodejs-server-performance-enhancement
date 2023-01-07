const express = require('express');
const cluster = require('cluster');
const os = require('os')

const app = express();

function delay(duration){
    const startTime = Date.now();
    while(Date.now() - startTime < duration){

    }
}


app.get('/', (req, res)=>{
    res.send(`Parenty process: ${process.ppid} Worker process ${process.pid}`);
});

app.get('/timer', (req, res)=>{
    delay(9000);
    res.send(`Parenty process: ${process.ppid} Worker process ${process.pid}`);
});

if (cluster.isMaster) {
    console.log('Master process started...');
    const NUM_CORES = os.cpus().length;
    for(let i =0; i < NUM_CORES; i++){
        cluster.fork();
    }
}else{
    console.log('Worker process started...');
    app.listen(3000);
}


const os = require("os");
const fs = require('fs');
const http = require("http");

class stats {
    constructor(Free, Total, Usage, Platform) {
        this.Free = Free;
        this.Total = Total;
        this.Usage = Usage;
        this.Os = Platform;
    };
};

setInterval(() => {
    const { freemem, totalmem, platform } = os;

    var mem = parseInt(freemem() / 1024 / 1024);
    var total = parseInt(totalmem() / 1024 / 1024);
    var percent = parseInt((mem / total) * 100);
    var oS = platform();

    const pcStats = new stats(`${mem}`, `${total}`, `${percent}`, `${oS}`)


    fs.writeFile('./api.json', JSON.stringify(pcStats), err => {
        if(err) throw err;
    })

    console.clear();
    console.table(pcStats);
}, 1000);


const data = require("./api.json");
const dataCleaner = require("./apiCleaner.json");

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
    res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
    setInterval(() => {
        res.end(JSON.stringify(data))
    }, 1000);
}).listen(port, () => console.log("Server is running"))

const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const { Telnet } = require('telnet-client');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

let serial,serialParser;
var {SerialPort, ReadlineParser} = require("serialport");


app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
const kvmIP = process.env.kvmIP || '1.1.1.1';

console.log('Listen Port: ' + port);
console.log('KVM IP: ' + kvmIP);
app.listen(port, () => console.log('Running on port: ' + port));




let tel = new Telnet()
let params = {
    host: kvmIP,
    port: 4001,
    negotiationMandatory: false,
    timeout: 1500
}
tel.connect(params);


app.get('/', (req, res) => {
    res.send("test");
})

app.post('/update', (req, res) => {
    console.log(req.body);
    update(req.body.client, req.body.host);
    res.status(200).send('1')


})

function update(client, host) {
    let txString = '>SetUSB 0' + client + ':0' + host;
    console.log(txString)
    tel.send(txString);
}
import express from "express";
import SseChannel from 'sse-channel'

const router = express.Router()

let ads = [
    {title: 'Nowa ksiązka autorstwa Marka "UG-moja depresja"', description: 'Już teraz dostępna w księgarniach'},
    {title: 'Do wygrania MILION $', description: 'Wystarczy że kupisz los na stronie www.scam.com'},
    {title: 'Nowa linia ciuchów marki BLE', description: 'Sprawdz naszą oferte na www.ble.com'}
]

const channel = new SseChannel({ cors: { origins: ["*"] }, jsonEncode: true});

function getNewAd() {
    const adIndex = Math.floor(Math.random() * ads.length);
    return ads[adIndex];
}

setInterval(() => {
        const ad = getNewAd();
        channel.send({data: ad})
}, 7000);


router.get('/stream', (req, res) => {
    channel.addClient(req,res);

    req.on("close", () => {
        channel.removeClient(req, res)
    })
});

export default router;
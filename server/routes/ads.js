import express from "express";
const router = express.Router();

let ads = [
    {title: 'Nowa ksiązka autorstwa Marka "UG-moja depresja"', description: 'Już teraz dostępna w księgarniach'},
    {title: 'Do wygrania MILION $', description: 'Wystarczy że kupisz los na stronie www.scam.com'},
    {title: 'Nowa linia ciuchów marki BLE', description: 'Sprawdz naszą oferte na www.ble.com'}
]

function getNewAd() {
    const adIndex = Math.floor(Math.random() * ads.length);
    return ads[adIndex];
}


router.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    setInterval(() => {
    const ad = getNewAd(); // This function would get the new ad data
    res.write(`data: ${JSON.stringify(ad)}\n\n`);
  }, 15000);

});

export default router;
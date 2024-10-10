const fetch = require('node-fetch');
const CryptoData = require('../models/crypto.model');

const fetchAndStoreCryptoData = async () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': process.env.COINGECKO_API_KEY  
            }
        });
        
        const data = await response.json();
        console.log('Fetched Data:', data); 

        const coins = ['bitcoin', 'ethereum', 'matic-network'];
        for (const coin of coins) {
            const crypto = new CryptoData({
                coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change
            });
            await crypto.save();
        }
        console.log('Data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

module.exports = fetchAndStoreCryptoData;

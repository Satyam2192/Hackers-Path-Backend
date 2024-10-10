const CryptoData = require('../models/crypto.model');

// API to calculate standard deviation for the last 100 price records
const getPriceDeviation = async (req, res) => {
    const { coin } = req.query;
    try {
        const records = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
        if (records.length === 0) {
            return res.status(404).json({ error: `No data found for ${coin}` });
        }

        const prices = records.map(record => record.price);
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);

        res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getPriceDeviation };

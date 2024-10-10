const CryptoData = require('../models/crypto.model');

// API to fetch the latest cryptocurrency data
const getCryptoStats = async (req, res) => {
    const { coin } = req.query;
    try {
        const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
        if (!latestData) {
            return res.status(404).json({ error: `Data not found for ${coin}` });
        }
        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getCryptoStats };

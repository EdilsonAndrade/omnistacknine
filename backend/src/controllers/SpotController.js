const Spot = require('../models/Spot');
const User = require('../models/User');


module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });
        return res.json(spots);

    },

    async store(req, res) {
        let { filename } = req.file;
        let { company, techs, price } = req.body;
        let { user_id } = req.headers;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const spot = await Spot.create({
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price,
            user: user_id

        });

        return res.json(spot);
    }

};
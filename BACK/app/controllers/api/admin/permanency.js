const ApiError = require('../../../errors/apiError');
const permanencyDataMapper = require('../../../models/admin/permanency');

module.exports = {
    async getAll(_,res) {
        const permanencies = await permanencyDataMapper.findAll();
        res.json(permanencies);
    },
    async getActive(_,res) {
        const activePermanency = await permanencyDataMapper.findActive();
        res.json(activePermanency);
    },
    async closeActive(_,res) {
        const activePermanency = await permanencyDataMapper.findActive();
        const { id } = activePermanency[0];
        const permanency = await permanencyDataMapper.closeActive(id);
        res.json(permanency);
    },
    async setDateNext() {

    },
};

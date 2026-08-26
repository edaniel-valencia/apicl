module.exports = {
    production: process.env.PRODUCTION === 'true',
    id_developer: parseInt(process.env.ID_DEVELOPER) || 0
};
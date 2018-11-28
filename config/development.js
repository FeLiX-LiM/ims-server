module.exports = {
    Level: 'debug',
    Mongoose: {
        uri: 'mongodb://127.0.0.1:27017',
        options: {
            dbName: 'imusicshare',
            useNewUrlParser: true
        },
        debug: true
    }
};

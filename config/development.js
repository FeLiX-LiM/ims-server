module.exports = {
    Level: 'debug',
    Mongoose: {
        uri: 'mongodb://127.0.0.1:27017',
        options: {
            dbName: 'imusicshare',
            useNewUrlParser: true
        },
        debug: true
    },
    Mail: {
        service: 'gmail',
        auth: {
            user: 'projects.00@jenmate.com',
            pass: 'Jenmate@2306'
        }
    }
};

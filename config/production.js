module.exports = {
    Level: 'info',
    Mongoose: {
        uri: 'mongodb://127.0.0.1:27017',
        options: {
            dbName: 'imusicshare',
            useNewUrlParser: true,
            user: 'imusicshare',
            pass: 'Jenmate@2306'
        },
        debug: false
    },
    Mail: {
        service: 'gmail',
        auth: {
            user: 'projects.00@jenmate.com',
            pass: 'Jenmate@2306'
        }
    }
};

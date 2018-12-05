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
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jenmate@foxmail.com',
            pass: 'uzkwbkarpujbehdf'
        }
    }
};

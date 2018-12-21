module.exports = () => ({
    app: {
        port: process.env.PORT || 3000
    },
    mongo: {
        uri: "mongodb://test_app:addodo1996oct1@ds227332.mlab.com:27332/dodo"
    },
    session: (MongoStore) => ({
        secret: 'super_dodo',
        key: 'express.sid',
        sessionKey: 'application_dodo',
        name: 'cookie',
        cookie: { path: '/', maxAge: 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
        clientSecret: 'QEQWE@#4234234ASDASDCZXC__+++2123123',
        store: new MongoStore({
            url: 'mongodb://test_app:addodo1996oct1@ds227332.mlab.com:27332/dodo',
            ttl: 60 * 60 * 1000
        })
    })
});
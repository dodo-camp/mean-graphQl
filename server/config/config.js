module.exports = () => ({
    app: {
        port: process.env.PORT || 3000
    },
    mongo: {
        uri: "mongodb://test_app:addodo1996oct1@ds227332.mlab.com:27332/dodo"
    },
    session: (MongoStore) => ({
        secret: 'ClydeIsASquirrel',
        resave: false,
        saveUninitialized: true,
        cookie: { path: '/', maxAge: 60 * 60 * 1000 },
        proxy: true,
        store: new MongoStore({
            url: 'mongodb://test_app:addodo1996oct1@ds227332.mlab.com:27332/dodo',
            ttl: 60 * 60 * 1000
        })
    })
});
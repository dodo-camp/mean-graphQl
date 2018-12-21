module.exports = () => ({
    app: {
        port: process.env.PORT || 3000
    },
    mongo: {
        uri: "mongodb://test_app:addodo1996oct1@ds227332.mlab.com:27332/dodo"
    },
    session: (MemcachedStore) => ({
        secret: 'ClydeIsASquirrel',
        resave: 'false',
        saveUninitialized: 'false',
        cookie: { path: '/', maxAge: 60 * 60 * 1000 },
        store: new MemcachedStore({
            servers: [process.env.MEMCACHIER_SERVERS],
            prefix: '_session_'
        })
    })
});
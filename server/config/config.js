module.exports = () => ({
    app: {
        port: process.env.PORT || 3000
    },
    mongo: {
        uri: "mongodb://test_app:addodo1996oct1@ds227332.mlab.com:27332/dodo"
    },
    session: (app) => ({
        secret: "sessionSecret",
        keys: ['key1'],
        path: '/',
        maxAge: 60 * 60 * 1000,
        secure: false
    })
});
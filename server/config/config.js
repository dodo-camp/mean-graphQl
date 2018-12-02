module.exports = () => ({
    app: {
        port: process.env.APP_PORT || 3000
    },
    mongo: {
        uri: "mongodb://test_app:addodo1996oct1@ds227332.mlab.com:27332/dodo"
    }
});
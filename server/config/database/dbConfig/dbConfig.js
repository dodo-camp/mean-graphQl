class DataBase {
    constructor(uri) {
        this.mongoose = require("mongoose");
        this._connect(uri);
    }

    _connect(uri) {
        var dbURI = uri;
        if (process.env.NODE_ENV === 'production') {
            dbURI = "mongodb://test_app:addodo1996oct1@ds227332.mlab.com:27332/dodo";
        }

        this.mongoose.connect(dbURI, { useNewUrlParser: true });

        // CONNECTION EVENTS
        const { connection } = this.mongoose;
        connection.on('connected', () =>
            console.log('Database Connection was Successful')
        );
        connection.on('error', (err) =>
            console.log('Database Connection Failed' + err)
        );
        connection.on('disconnected', () =>
            console.log('Database Connection Disconnected')
        );
        process.on('SIGINT', () => {
            connection.close();
            console.log(
                'Database Connection closed due to NodeJs process termination'
            );
            process.exit(0);
        });

        require('../schemas/index')();
    }
}

module.exports = DataBase;
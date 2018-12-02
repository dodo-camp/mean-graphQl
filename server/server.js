class App {
    constructor() {
        require('module-alias/register')
        this._init();
    }
    _init() {
        this._setApp();
        this._setPathAndConfig();
        this._setAppStaticPath();
        this._initServiceLocator();
        this._initDataBase();
        this._setGraphQl();
        this._setRoute();
        this._listen();
    }

    _setApp() {
        this.express = require('express');
        this.app = this.express();
    }

    _setPathAndConfig() {
        this.path = require('path');
        this.config = require('@config/config')();
    }

    _initServiceLocator() {
        require('@config/depedency/di')();
    }

    _setAppStaticPath() {
        this.app.use(this.express.static(this.path.join(__dirname, '../dist/App')));
    }

    _initDataBase() {
        const DataBase = require('@config/database/dbConfig/dbConfig');
        new DataBase(this.config.mongo.uri);
    }

    _setGraphQl() {
        const express_graphql = require('express-graphql');
        const schema = require('@graphQl/schema');
        const root = require('@graphQl/resolver/index');
        this.app.use('/graphql', (req, res) => {
            express_graphql({
                schema: schema,
                rootValue: root,
                context: { req, res },
                graphiql: true
            })(req, res)
        });
    }

    _setRoute() {
        this.app.get('*', (req, res) => {
            res.sendFile(this.path.join(__dirname, '../dist/App/index.html'));
        });
    }

    _listen() {
        this.app.listen(this.config.app.port, () => {
            console.log("server started");
        })
    }
}

var appObj = new App();




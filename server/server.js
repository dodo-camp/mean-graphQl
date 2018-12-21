class App {
    constructor() {
        this._init();
    }
    _init() {
        this._setApp();
        this._setCors();
        this._setPathAndConfig();
        this._setAppStaticPath();
        this._initServiceLocator();
        this._setSession();
        this._initDataBase();
        this._setGraphQl();
        this._setRoute();
        this._listen();
    }

    _setApp() {
        this.express = require('express');
        this.app = this.express();
    }

    _setCors() {
        const cors = require('cors');
        this.app.use(cors({
            credentials: true,
            origin: 'https://dry-sea-87636.herokuapp.com'
        }));
        this.app.set('trust proxy', 1);
    }

    _setPathAndConfig() {
        this.path = require('path');
        this.config = require('./config/config')();
    }

    _initServiceLocator() {
        require('./config/depedency/di')();
    }

    _setSession() {
        const cookieParser = require('cookie-parser');
        this.app.use(cookieParser());
        const Session = require('./config/session/session');
        new Session(this.app, this.config.session);
    }

    _setAppStaticPath() {
        this.app.use(this.express.static(this.path.join(__dirname, '../dist/App')));
    }

    _initDataBase() {
        const DataBase = require('./config/database/dbConfig/dbConfig');
        new DataBase(this.config.mongo.uri);
    }

    _setGraphQl() {
        const express_graphql = require('express-graphql');
        const bodyParser = require('body-parser')
        const schema = require('./graphQl/schema');
        const root = require('./graphQl/resolver/index');
        this.app.use('/graphql', bodyParser.json(),
            express_graphql((req, res) => ({
                schema: schema,
                rootValue: root,
                context: { req, res },
                graphiql: true
            })));
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




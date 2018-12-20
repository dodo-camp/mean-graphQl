class Session {
    constructor(app, sessionObj) {
        this.app = app;
        this.session = require('express-session');
        this.MongoStore = require('connect-mongo')(this.session);
        this.sessionObj = sessionObj(this.MongoStore);
        this._createSession();
    }

    _createSession() {
        this.app.use(
            this.session(this.sessionObj)
        );
    }

}

module.exports = Session;
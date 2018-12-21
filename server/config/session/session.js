class Session {
    constructor(app, sessionObj) {
        this.app = app;
        this.session = require('cookie-session');
        this.sessionObj = sessionObj(this.app);
        this._createSession();
    }

    _createSession() {
        this.app.use(
            this.session(this.sessionObj)
        );
    }

}

module.exports = Session;
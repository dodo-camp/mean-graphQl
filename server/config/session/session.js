class Session {
    constructor(app, sessionObj) {
        this.app = app;
        this.session = require('express-session');
        this.MemcachedStore = require('connect-memjs')(this.session);
        this.sessionObj = sessionObj(this.MemcachedStore);
        this._createSession();
    }

    _createSession() {
        this.app.use(
            this.session(this.sessionObj)
        );
    }

}

module.exports = Session;
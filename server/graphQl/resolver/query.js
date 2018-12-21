const serviceLocator = require('../../lib/service_locator');

var query = {
    signIn: async (args, { req }) => {
        return serviceLocator.get('userService').login(args, req);
    },
    dashboardAuth: (args, { req }) => {
        if (req.session.user) {
            return {
                success: true,
                username: req.session.user
            }
        }
        else {
            return {
                success: false,
                username: ""
            }
        }
    },
    loginAuth: (args, { req }) => {
        if (req.session.user) {
            return {
                success: false,
                username: req.session.user
            }
        }
        else {
            return {
                success: true,
                username: ""
            }
        }
    },
    logOut: (args, { req, res }) => {
        if (req.session.user) {
            req.session = null;
            return {
                success: true
            }
        }
    }
}

module.exports = query;



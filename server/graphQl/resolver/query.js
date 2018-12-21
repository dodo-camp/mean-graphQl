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
    logOut: async (args, { req, res }) => {
        if (req.session.user && req.session.cookie) {
            let dest = await destroyCookie(req, res);
            if (dest) {
                return {
                    success: true
                }
            }
        }
    }
}

function destroyCookie(req, res) {
    return new Promise((resolve, reject) => {
        delete req.session.user;
        req.session.destroy(function (err) {
            res.cookie("cookie", null, {
                maxAge: 0,
                httpOnly: true
            });
            resolve(true);
        });
    })
}

module.exports = query;



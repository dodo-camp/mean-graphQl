const serviceLocator = require('@lib/service_locator');

var query = {
    signIn: async (args, context) => {
        return serviceLocator.get('userService').login(args);
    }
}

module.exports = query;



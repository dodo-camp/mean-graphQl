const serviceLocator = require('@lib/service_locator');

var mutation = {
    signUp: async (args, context) => {
        return serviceLocator.get('userService').register(args);
    }
}

module.exports = mutation;

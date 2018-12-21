module.exports = () => {
    const serviceLocator = require('@lib/service_locator');
    serviceLocator.register('mongoose', () => {
        return require('mongoose');
    });

    serviceLocator.register('userService', (serviceLocator) => {
        const mongoose = require('mongoose');
        const UserService = require('@services/users');
        return new UserService(mongoose);
    });
}
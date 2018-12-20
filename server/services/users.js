class UserService {
    constructor(mongoose) {
        this.mongoose = mongoose;
    }

    async register(body) {
        const Users = this.mongoose.model('Users');
        const { username, email, password } = body;
        const user = await Users.find({ $or: [{ username: username }, { email: email }] }, { _id: 1 }).sort({ username: 1 }).limit(1);

        if (user.length) {
            return {
                success: false,
                message: "User aleady exists"
            }
        }
        else {
            await Users.create(
                {
                    username: username,
                    email: email,
                    password: password
                }
            );
            return {
                success: true,
                message: "Registered"
            }
        }
    }

    async login({ username, password }, req) {
        const Users = this.mongoose.model('Users');
        const found = await Users.find({ username: username }, { password: 1, _id: 0 }).sort({ username: 1 }).limit(1);
        if (found.length) {
            let user = await found[0].validPassword(password);
            if (user) {
                req.session.user = username;
                return this.sendResponseForLogin(true, "Logged In", username);
            }
            else
                return this.sendResponseForLogin(false, "Wrong Username or Password", "");
        }
        else
            return this.sendResponseForLogin(false, "Wrong Username or Password", "");
    }

    sendResponseForLogin(success, message, username) {
        return {
            success: success,
            message: message,
            username: username
        }
    }
}

module.exports = UserService;
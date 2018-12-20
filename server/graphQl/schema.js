var { buildSchema } = require('graphql');

var schema = buildSchema(
`
    type Response {
        success: Boolean!
        message: String!
        username: String!
    }

    type DashAuth {
        success: Boolean!
        username: String!
    }

    type LoginAuth {
        success: Boolean!
        username: String!
    }

    type logOutRes {
        success: Boolean!
    }

    type Query {
        signIn(username: String!, password: String!): Response!
        dashboardAuth: DashAuth!
        loginAuth: LoginAuth!
        logOut: logOutRes!
    }

    type Mutation {
        signUp(username: String!, password: String!, email: String!): Response!
    }

`
);

module.exports = schema;
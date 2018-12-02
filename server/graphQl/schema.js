var { buildSchema } = require('graphql');

var schema = buildSchema(
`
    type Response {
        success: Boolean!
        message: String!
    }

    type Query {
        signIn(username: String!, password: String!): Response!
    }

    type Mutation {
        signUp(username: String!, password: String!, email: String!): Response!
    }

`
);

module.exports = schema;
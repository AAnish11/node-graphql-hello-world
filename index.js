const { buildSchema } = require('graphql');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');


// Used String!, It means a function not return nullable value
const schemaData = `
type Query {
    sayHello: String!,
    randomInt: Int!,
    randomfloat: Float!
}
`;
// Create build schema for hello world program
const schema = buildSchema(schemaData);

// root value
const root = {
    sayHello: () => {
        return 'Hello World';
    },
    randomInt: () => {
        return Math.floor(Math.random() * 10);
    },
    randomfloat: () => {
        return Math.random() * 10;
    }
};

// create app instance
const app = express();

// set graphql in app 

app.use('/', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));
// define port
const port = process.argv[2] || 3000; // pass custom argument via script or else use default 3000
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
});
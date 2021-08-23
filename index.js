const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');

const existingDatabase = {
    1: {
        name: 'Anish Agarwal',
        mobileNumber: '+91XXXXXXXXXXXXXX'
    },
    2: {
        name: 'Heena Agarwal',
        mobileNumber: '+91XXXXXXXXXXXXXX'
    }
};

// create graphql type for 
const userType = new graphql.GraphQLObjectType({
    name: 'user',
    fields: {
        name: {
            type: graphql.GraphQLString,
        },
        mobileNumber: {
            type: graphql.GraphQLString
        }
    }
});

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            },
            resolve: (_, { id }) => {
                console.log(id);
                return existingDatabase[id];
            }
        },
        users: {
            type: graphql.GraphQLList(userType),
            resolve: (_) => {
                return Object.values(existingDatabase);
            }
        }
    }
});

const schema = new graphql.GraphQLSchema({ query: queryType });

// create app instance
const app = express();

// set graphql in app 

app.use('/', graphqlHTTP({
    schema,
    graphiql: true,
}));
// define port
const port = process.argv[2] || 3000; // pass custom argument via script or else use default 3000
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
});
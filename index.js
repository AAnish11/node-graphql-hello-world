const { graphql, buildSchema } = require('graphql');


// Used String!, It means a function not return nullable value
const schemaData = `
type Query {
    sayHello: String!
}
`;
// Create build schema for hello world program
const schema = buildSchema(schemaData);

// root value
const root = {
    sayHello: () => {
        return 'Hello World';
    }
};

graphql(schema, '{sayHello}', root).then(
        resp => console.log(resp)
    )
    .catch(
        err => console.log('error occured', err)
    );
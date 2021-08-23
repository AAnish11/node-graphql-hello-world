const { buildSchema } = require('graphql');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

let messageId = 1;
let messages = {};
// Used String!, It means a function not return nullable value
const schemaData = `
input MessageInput {
    content: String!,
    author: String!
}
type Message {
    id: ID!
    content: String!,
    author: String!
}
type Mutation {
    createMessage(inputData: MessageInput!): Message,
    updateMessage(id: ID!, inputData: MessageInput!): Message,
}
type Query {
    getAllMessages: [Message!],
    getMessageById(id: ID!): Message!
}
`;
// Create build schema for hello world program
const schema = buildSchema(schemaData);
// root value
const root = {
    getAllMessages: () => {
        console.log(Object.values(messages));
        return Object.values(messages).map(inputData => new Message(inputData.id, inputData.content, inputData.author));
    },
    getMessageById: ({ id }) => {
        const messageById = messages[id] || {};
        return new Message(messageById.id, messageById.content, messageById.author);
    },
    createMessage: (data) => {
        const { author, content } = data.inputData;
        messages[messageId] = {
            id: messageId,
            author,
            content
        };
        const newMessage = new Message(messageId, content, author);
        messageId += 1;
        return newMessage;
    },
    updateMessage: (id, { author, content }) => {

    }
};
// Class for createing new object for messahe
class Message {
    constructor(id, content, author) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}



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
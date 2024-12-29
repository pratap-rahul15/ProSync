// Import required modules
const express = require('express');
const colors = require('colors');
const cors = require('cors');

require('dotenv').config();

// Bring the GraphQL HTTP server
const { graphqlHTTP } = require('express-graphql');

// Bring the schema
const schema = require('./schema/schema.js');

const connectDB = require('./schema/config/db.js');

const port = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(cors());

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development', // Enable GraphiQL in development mode
}));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

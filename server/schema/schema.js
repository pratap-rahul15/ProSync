// const { projects, clients } = require('./sampleData.js');

// Bring the Moongoose model.
const Project = require('../models/Project.js');
const Client = require('../models/Client.js');

const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
} = require('graphql');

// Project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { // Client is a child of Project.
            type: ClientType,
            resolve(parent, args) {
                // Use find() to locate a client with a matching ID
                return Client.findById(parent.clientId);
            },
        },
    }),
});

// Client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

// Create a Root Query (Query is a way to fetch data from the database).
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // fetching all the project's data.
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            },
        },
        // fetching the project's data using a specific id.
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Use find() to locate a client with a matching ID
                return Project.findById(args.id);
            },
        },
        // fetching all the client's data.
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            },
        },
        // fetching the client's data using a specific id.
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Use find() to locate a client with a matching ID
                return Client.findById(args.id);
            },
        },
    },
});

// Mutation for adding & deleting the project.
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return client.save();
            },
        },

        // Delete a Client.
        deleteClient: {
            type: ClientType,
            args: { 
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                try {
                    // Find all projects associated with the client
                    const projects = await Project.find({ clientId: args.id });
                    
                    if (projects.length > 0) {
                        await Promise.all(projects.map((project) => project.deleteOne()));
                    }

                    // Delete the client
                    return await Client.findByIdAndDelete(args.id);
                } catch (error) {
                    throw new Error(`Error deleting client: ${error.message}`);
                }
            },
        },

        // Add a Project.
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            },
        },

        // Delete a Project.
        deleteProject: {
            type: ProjectType,
            args: { 
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Project.findByIdAndDelete(args.id);
            },
        },

        // Update a Project.
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                );
            },
        },
    },
});

// Export the GraphQL schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});

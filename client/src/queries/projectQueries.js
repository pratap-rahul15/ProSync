import { gql } from '@apollo/client';


// To fetch/GET all projects from the server.
const GET_PROJECTS = gql`
    query getProjects {
        projects {
        id
        name
        status
        description
        client {
            id
            name
        }
        }
    }`;

  // To fetch/GET single project from the server.  

  const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
        id
        name
        status
        description
        client {
            id
            name
            phone
            email
        }
        }
    }`;

    // To fetch/GET all clients from the server.

export { GET_PROJECTS, GET_PROJECT };
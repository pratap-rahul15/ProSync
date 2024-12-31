import { gql } from "@apollo/client";


// To Add Project.

const ADD_Project = gql`
   
    mutation AddProject
    ($name: String!, $description: 
    String!, $status: ProjectStatus!, $clientId: ID!) {
    
        addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

// To delete Project.

const DELETE_Project = gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
}
        }
`;

// To Update Project.

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;



export { ADD_Project, DELETE_Project, UPDATE_PROJECT };
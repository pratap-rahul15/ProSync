import { gql } from '@apollo/client';

// Will fetch the data from the query.
const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }`;

  export { GET_CLIENTS };

  
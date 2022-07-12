import { gql } from "@apollo/client";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      username
      age
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdateName($input: UpdateNameInput!) {
    updateName(input: $input) {
      name
      username
      age
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
      username
      age
    }
  }
`;

export { CREATE_USER_MUTATION, UPDATE_USER_MUTATION, DELETE_USER_MUTATION };

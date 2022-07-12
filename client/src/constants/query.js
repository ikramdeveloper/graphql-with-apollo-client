import { gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  {
    users {
      ... on UsersSuccessResult {
        users {
          id
          name
          username
          age
          nationality
        }
      }

      ... on ErrorResult {
        message
      }
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const QUERY_SINGLE_MOVIE = gql`
  query MOVIE($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const QUERY_SINGLE_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
    }
  }
`;

export {
  QUERY_ALL_USERS,
  QUERY_ALL_MOVIES,
  QUERY_SINGLE_MOVIE,
  QUERY_SINGLE_USER,
};

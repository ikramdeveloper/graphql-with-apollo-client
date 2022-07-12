const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    # users: [User!]!
    users: UsersResult!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }

  input UpdateNameInput {
    id: ID!
    updatedName: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateName(input: UpdateNameInput!): User
    deleteUser(id: ID!): [User!]
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
  }

  type UsersSuccessResult {
    users: [User!]!
  }

  type ErrorResult {
    message: String!
  }

  union UsersResult = UsersSuccessResult | ErrorResult
`;

module.exports = typeDefs;

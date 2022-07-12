const { UsersList, MoviesList } = require("../data/fakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    users() {
      // return UsersList;

      if (UsersList) return { users: UsersList };
      return { message: "There is an error" };
    },

    user(parent, args) {
      const id = Number(args.id);
      const user = _.find(UsersList, { id });
      return user;
    },

    movies() {
      return MoviesList;
    },

    movie(parent, args) {
      const name = args.name;
      const movie = _.find(MoviesList, { name });
      return movie;
    },
  },
  User: {
    favoriteMovies() {
      return _.filter(
        MoviesList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  UsersResult: {
    __resolveType(obj) {
      if (obj.users) return "UsersSuccessResult";
      else if (obj.message) return "ErrorResult";

      return null;
    },
  },

  Mutation: {
    createUser(parent, args) {
      const user = args.input;
      const lastUserId = UsersList.at(-1).id;
      user.id = lastUserId + 1;
      // const result = _.create(UsersList, user);
      UsersList.push(user);
      return user;
    },

    updateName(parent, args) {
      const { id, updatedName } = args.input;
      const user = _.find(UsersList, (user) => user.id === Number(id));
      if (!user || !updatedName) return;
      user.name = updatedName;
      return user;
    },

    deleteUser(parent, args) {
      const { id } = args;
      const result = _.remove(UsersList, (user) => user.id === Number(id));
      return result;
    },
  },
};

module.exports = resolvers;

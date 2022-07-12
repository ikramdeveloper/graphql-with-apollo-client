import { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import {
  QUERY_ALL_USERS,
  QUERY_ALL_MOVIES,
  QUERY_SINGLE_MOVIE,
} from "../constants/query";
import { DELETE_USER_MUTATION } from "../constants/mutation";

const DisplayData = () => {
  const [movieName, setMovieName] = useState("");

  const { data: usersData, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: singleMovie, error: movieError }] =
    useLazyQuery(QUERY_SINGLE_MOVIE);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  if (usersData) console.log(usersData);

  const handleDelete = async (userId) => {
    try {
      const { data } = await deleteUser({
        variables: {
          id: userId,
        },
      });

      console.log(data);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {usersData?.users && (
        <table>
          <thead>
            <tr>
              {Object.keys(usersData?.users?.users[0])
                .slice(1)
                .map((item) => (
                  <th key={item}>{item}</th>
                ))}
              <th>Delete User</th>
            </tr>
          </thead>

          <tbody>
            {usersData?.users?.users.map((user) => (
              <tr key={user.id}>
                {Object.values(user)
                  .slice(1)
                  .map((item, idx) => (
                    <td key={idx}>{item}</td>
                  ))}
                <td>
                  <button onClick={() => handleDelete(user.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Movies</h2>
      <ul>
        {moviesData &&
          moviesData.movies.map((movie) => (
            <li key={movie.id}>
              Name: {movie.name} <br />
              Year Of Publication: {movie.yearOfPublication} <br />
              Is In Theaters: {movie.isInTheaters ? "Yes" : "No"}
              <hr />
            </li>
          ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchMovie({
            variables: {
              name: movieName,
            },
          });
        }}
      >
        <input
          type="text"
          placeholder="search movie..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {movieError && <p>Something is fishy... </p>}
      {singleMovie && (
        <div>
          <h4>Name: {singleMovie.movie.name}</h4>
          <h4>Year Of Publication: {singleMovie.movie.yearOfPublication}</h4>
        </div>
      )}
    </div>
  );
};
export default DisplayData;

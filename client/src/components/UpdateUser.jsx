import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { UPDATE_USER_MUTATION } from "../constants/mutation";
import { QUERY_ALL_USERS } from "../constants/query";

const UpdateUser = () => {
  const [updatedName, setUpdatedName] = useState("");
  const [userId, setUserId] = useState("");

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const { refetch } = useQuery(QUERY_ALL_USERS);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || isNaN(Number(userId)) || !updatedName) {
      alert("Please fill all the fields accurately");
      return;
    }

    try {
      const { data } = await updateUser({
        variables: {
          input: {
            id: userId,
            updatedName,
          },
        },
      });
      console.log(data);

      refetch();

      setUpdatedName("");
      setUserId("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="number"
            id="id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};
export default UpdateUser;

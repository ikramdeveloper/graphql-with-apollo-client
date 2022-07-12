import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { CREATE_USER_MUTATION } from "../constants/mutation";
import { QUERY_ALL_USERS } from "../constants/query";

const CreateUser = () => {
  const initialState = {
    name: "",
    username: "",
    age: "",
    nationality: "BRAZIL",
  };
  const [formData, setFormData] = useState(initialState);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const { refetch } = useQuery(QUERY_ALL_USERS);

  const countries = ["CANADA", "BRAZIL", "INDIA", "GERMANY", "CHILE"];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((item) => !item)) {
      alert("Please all the fields");
      return;
    }

    formData.age = Number(formData.age);

    createUser({
      variables: {
        input: formData,
      },
    })
      .then((data) => {
        console.log(data.data);
        refetch();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name..."
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username..."
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            placeholder="Enter age..."
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="nationality">Nationality:</label>
          <select
            name="nationality"
            id="nationality"
            value={formData.nationality}
            onChange={handleChange}
          >
            {countries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};
export default CreateUser;

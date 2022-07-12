import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";
import CreateUser from "./components/CreateUser";
import DisplayData from "./components/DisplayData";
import UpdateUser from "./components/UpdateUser";

const App = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `${process.env.REACT_APP_SERVER_URI}/graphql`,
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
        <CreateUser />
        <UpdateUser />
      </div>
    </ApolloProvider>
  );
};
export default App;

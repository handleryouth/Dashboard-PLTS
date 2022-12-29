import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components";
import { RouteStack } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <RouteStack />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

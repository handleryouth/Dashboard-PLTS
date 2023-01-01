import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

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

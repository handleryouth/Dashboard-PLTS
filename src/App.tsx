import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "utils";
import { Layout } from "./components";
import { RouteStack } from "./routes";
import { ResponseModalInterceptorProvider } from "context";

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <ResponseModalInterceptorProvider>
          <BrowserRouter>
            <Layout>
              <RouteStack />
            </Layout>
          </BrowserRouter>
        </ResponseModalInterceptorProvider>
      </Provider>
    </CookiesProvider>
  );
}

export default App;

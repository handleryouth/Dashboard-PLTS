import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "utils";
import { ResponseModalInterceptorProvider } from "context";
import { queryClient } from "const";
import { ErrorBoundary, Layout } from "./components";
import { RouteStack } from "./routes";

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ResponseModalInterceptorProvider>
            <BrowserRouter>
              <Layout>
                <ErrorBoundary>
                  <RouteStack />
                </ErrorBoundary>
              </Layout>
            </BrowserRouter>
          </ResponseModalInterceptorProvider>
        </Provider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;

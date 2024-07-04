import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Router from "./routes";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router />
        {/* <Toaster /> */}
      </ThemeProvider>
    </>
  );
}

export default App;

import "./App.css";
import Router from "./routes";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ToastContainer />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;

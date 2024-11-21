import "./App.css";
import { Toaster } from "./components/ui/toaster";
import Router from "./routes";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
<<<<<<< HEAD
=======
        <Toaster />
>>>>>>> 4ea154dd7d2fc66dbf8622859ef5603e8db6b77c
        <Router />
        <Toaster/>
        {/* <ToastContainer /> */}
      </ThemeProvider>
    </>
  );
}

export default App;

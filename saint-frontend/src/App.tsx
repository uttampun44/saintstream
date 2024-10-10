import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoute from "./AppRoute";
import { Toaster } from "sonner";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <>
      <ContextProvider>
        <Toaster />
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;

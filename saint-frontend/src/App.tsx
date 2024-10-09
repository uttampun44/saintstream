import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoute from "./AppRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </>
  );
}

export default App;

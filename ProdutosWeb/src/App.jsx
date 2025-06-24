import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Opcional: limpa estilos padrões do navegador
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import theme from "./theme"; // caminho do seu arquivo theme.js
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <div style={{ marginTop: 32 }}>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;



import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ListProduct from "./scenes/product/listProduct";
import CreateProduct from "./scenes/product/createProduct";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

// Define type for the sidebar visibility state
interface SidebarProps {
  isSidebar: boolean;
}

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState<boolean>(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content" style={{marginLeft: "85px"}}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<ListProduct />} />
              <Route path="/listproduct" element={<ListProduct />} />
              <Route path="/createproduct" element={<CreateProduct />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

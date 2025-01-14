import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "./components/AppAppBar";
import Home from "./components/Home";
import Borrows from "./components/Borrows";
import WithDraw from "./components/WithDraw";
import Liquidity from "./components/Liquidity";
import DashBoard from "./components/DashBoard";
import Footer from "./components/Footer";
import AppTheme from "../shared-theme/AppTheme";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MarketingPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <div>
        <BrowserRouter>
          <AppAppBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route path="/Borrows" element={<Borrows />} />
            <Route path="/WithDraw" element={<WithDraw />} />
            <Route path="/Liquidity" element={<Liquidity />} />
          </Routes>
        </BrowserRouter>
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}


import './index.css'
import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import MySidebar from "./scenes/global/MySidebar";
import Dashboard from "./scenes/dasboard/Dasboard"
import Team from "./scenes/team/Team"
import Contacts from './scenes/contacts/Contacts'
import Invoices from "./scenes/invoices/Invoices";
import Form from "./scenes/form/Form";

import Calendar from "./scenes/calendar/Calendar"
import Faq from "./scenes/faq/Faq";
import Bar from "./scenes/bar/Bar";
import Line from "./scenes/line/Line";
import Pie from "./scenes/pie/Pie";
import Geography from "./scenes/geography/Geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Dashboard />
          
          </main>
        </div>
      ),
    },
    {
      path: "/team",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Team />
          </main>
        </div>
      ),
    },
    {
      path: "/contacts",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Contacts />
          </main>
        </div>
      ),
    },
    {
      path: "/invoices",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Invoices />
          </main>
        </div>
      ),
    },
{
      path: "/form",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Form />
          </main>
        </div>
      ),
    },

     {
      path: "/faq",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Faq />
          </main>
        </div>
      ),
    },
{
      path: "/bar",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Bar />
          </main>
        </div>
      ),
    },

    {
      path: "/pie",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Pie />
          </main>
        </div>
      ),
    },

    {
      path: "/line",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Line />
          </main>
        </div>
      ),
    },
   
    {
      path: "/calendar",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Calendar />
          </main>
        </div>
      ),
    },

    {
      path: "/geography",
      element: (
        <div className="app">
          <MySidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Geography />
          </main>
        </div>
      ),
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;


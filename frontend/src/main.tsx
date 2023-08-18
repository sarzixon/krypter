import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {theme} from "./themes/PrimaryTheme";
import {ThemeProvider} from "@mui/material";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage/AuthPage";

console.log(theme)



const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route
            element={<div>Hello Word</div>}
            path="/"
        />
        <Route
            element={ <AuthPage /> }
            path="/auth"
        >
            <Route
                element={ <AuthPage /> }
                path="login"
            />
            <Route
                element={ <AuthPage /> }
                path="register"
            />
        </Route>
        <Route
            element={<div>dashboard</div>}
            path="/dashboard"
        >

        </Route>
    </>
));


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>,
)

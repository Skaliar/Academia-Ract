import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./componets/menu/menu";
import routes from "./Routes/index";
import Footer from "./Routes/footer/Footer";
import "./App.css";

const AcademApp = () => {
  return (
    <Router>
      <header>
        <h2>Conviértete en la próxima estrella FullStack</h2>
        <h2>
          estudiando en <br></br>IT ACADEMY
        </h2>
      </header>
      <main className="main">
        <div className="aside">
          <Menu />
        </div>
        <div className="section">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default AcademApp;

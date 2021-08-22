import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddService from "./components/Service/AddService";
import ServicesList from "./components/Service/ServicesList";
import AddCity from "./components/City/AddCity";
import CitiesList from "./components/City/CitiesList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/servicos" className="navbar-brand">
          OnService
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/services"} className="nav-link">
              Serviços
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add-service"} className="nav-link">
              Adicionar Serviço
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/cities"} className="nav-link">
              Cidades
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add-city"} className="nav-link">
              Adicionar Cidade
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Central OnService</h2>
        <Switch>
          <Route exact path={["/", "/services"]} component={ServicesList} />
          <Route exact path="/add-service" component={AddService} />
          <Route exact path="/add-city" component={AddCity} />
          <Route exact path={"/cities"} component={CitiesList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

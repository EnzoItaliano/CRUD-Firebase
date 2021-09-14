import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddService from "./components/Service/AddService";
import ServicesList from "./components/Service/ServicesList";
import AddCity from "./components/City/AddCity";
import CitiesList from "./components/City/CitiesList";
import ProfessionalsList from "./components/Professional/ProfessionalsList";

function App() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a href="/services" className="navbar-brand">
            OnService
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
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
              <li className="nav-item">
                <Link to={"/professional"} className="nav-link">
                  Profissionais
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Central OnService</h2>
        <Switch>
          <Route exact path={["/", "/services"]} component={ServicesList} />
          <Route exact path="/add-service" component={AddService} />
          <Route exact path="/add-city" component={AddCity} />
          <Route exact path={"/cities"} component={CitiesList} />
          <Route exact path={"/professional"} component={ProfessionalsList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

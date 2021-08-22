import React, { useState, useEffect } from "react";
import ServiceDataService from "../../services/ServicesService";
import Service from "./Service";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selection, setSelection] = useState("Todas");

  const onDataChange = (items) => {
    let services = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      services.push({
        key: key,
        name: data.name,
        category: data.category,
      });
    });
    services.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    })
    setServices(services);
  };

  useEffect(() => {
    ServiceDataService.getAll().on("value", onDataChange);

    return () => {
      ServiceDataService.getAll().off("value", onDataChange);
    };
  }, []);

  const refreshList = () => {
    setCurrentService(null);
    setCurrentIndex(-1);
  };

  const setActiveService = (service, index) => {
    const { name, category } = service;

    setCurrentService({
      key: service.key,
      name,
      category,
    });

    setCurrentIndex(index);
  };

  const removeAllServices = () => {
    ServiceDataService.removeAll()
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lista de Serviços</h4>
        <select class="form-select" aria-label="Default select example" onChange={(e)=>{setSelection(e.target.value)}}>
          <option selected hidden>Categorias</option>
          <option value="Todas">Todas</option>
          <option value="Beleza">Beleza</option>
          <option value="Ensino">Ensino</option>
          <option value="Eventos">Eventos</option>
          <option value="Manutenção">Manutenção</option>
          <option value="Outros">Outros</option>
          <option value="Residencial">Residencial</option>
          <option value="Saúde">Saúde</option>
          <option value="Tecnologia">Tecnologia</option>
        </select>
        <hr />
        <ul className="list-group">
          {services
            .filter((service) => {
              if(service.category == selection || selection == "Todas") return service
            })
            .map((service, index) => (
            <li
              className={"list-group-item " + (index === currentIndex ? "active" : "")}
              onClick={() => setActiveService(service, index)}
              key={index}
            >
              {service.name}
            </li>
          ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentService ? (
          <Service service={currentService} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Por favor clique em um serviço...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesList;

import React, { useState } from "react";
import ServiceDataService from "../../services/ServicesService";

const Service = (props) => {
  const initialServiceState = {
    key: null,
    name: "",
    category: ""
  };
  const [currentService, setCurrentService] = useState(initialServiceState);
  const [message, setMessage] = useState("");

  const { service } = props;
  if (currentService.key !== service.key) {
    setCurrentService(service);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const updateService = () => {
    const data = {
      name: currentService.name,
      category: currentService.category,
    };

    ServiceDataService.update(currentService.key, data)
      .then(() => {
        setMessage("O serviço foi atualizado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteService = () => {
    ServiceDataService.remove(currentService.key)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentService ? (
        <div className="edit-form">
          <h4>Serviço</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentService.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentService.category}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge bg-danger mr-2" onClick={deleteService}>
            Apagar
          </button>

          <button
            type="submit"
            className="badge bg-success"
            onClick={updateService}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor clique em um serviço...</p>
        </div>
      )}
    </div>
  );
};

export default Service;

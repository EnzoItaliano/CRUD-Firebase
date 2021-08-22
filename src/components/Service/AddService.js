import React, { useState } from "react";
import ServiceDataService from "../../services/ServicesService";

const AddService = () => {
  const initialServiceState = {
    name: "",
    category: ""
  };
  const [service, setService] = useState(initialServiceState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setService({ ...service, [name]: value });
  };

  const saveService = () => {
    var data = {
      name: service.name,
      category: service.category,
    };

    ServiceDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newService = () => {
    setService(initialServiceState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newService}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={service.title}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <input
              type="text"
              className="form-control"
              id="category"
              required
              value={service.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>

          <button onClick={saveService} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddService;

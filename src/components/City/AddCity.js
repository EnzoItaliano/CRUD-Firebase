import React, { useState } from "react";
import CityDataService from "../../services/CitiesService";

const AddCity = () => {
  const initialCityState = {
    name: "",
    state: "SP",
    country: "Brasil"
  };
  const [city, setCity] = useState(initialCityState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCity({ ...city, [name]: value });
  };

  const saveCity = () => {
    var data = {
      name: city.name,
      state: city.state,
      country: city.country
    };

    CityDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCity = () => {
    setCity(initialCityState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCity}>
            Add
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
              value={city.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">Estado</label>
            <input
              type="text"
              className="form-control"
              id="state"
              required
              value={city.description}
              onChange={handleInputChange}
              name="state"
            />
          </div>

          <button onClick={saveCity} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCity;

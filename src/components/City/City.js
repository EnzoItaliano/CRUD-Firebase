import React, { useState } from "react";
import CityDataService from "../../services/CitiesService";

const City = (props) => {
  const initialCityState = {
    key: null,
    name: "",
    state: "",
    country: "Brasil",
  };
  const [currentCity, setCurrentCity] = useState(initialCityState);
  const [message, setMessage] = useState("");

  const { city } = props;
  if (currentCity.key !== city.key) {
    setCurrentCity(city);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCity({ ...currentCity, [name]: value });
  };

  const updateCity = () => {
    const data = {
      name: currentCity.name,
      state: currentCity.state,
      country: currentCity.country
    };

    CityDataService.update(currentCity.key, data)
      .then(() => {
        setMessage("A cidade foi atualizada com sucesso!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCity = () => {
    CityDataService.remove(currentCity.key)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCity ? (
        <div className="edit-form">
          <h4>Cidade</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCity.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">Estado</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={currentCity.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">País</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={currentCity.country}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge bg-danger mr-2" onClick={deleteCity}>
            Apagar
          </button>

          <button
            type="submit"
            className="badge bg-success"
            onClick={updateCity}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor clique em uma cidade...</p>
        </div>
      )}
    </div>
  );
};

export default City;

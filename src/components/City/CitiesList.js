import React, { useState, useEffect } from "react";
import CityDataService from "../../services/CitiesService";
import City from "./City";

const CitiesList = () => {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selection, setSelection] = useState("Todos");

  const onDataChange = (items) => {
    let cities = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      cities.push({
        key: key,
        name: data.name,
        state: data.state,
        country: data.country,
      });
    });
    cities.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    })
    setCities(cities);
  };

  useEffect(() => {
    CityDataService.getAll().on("value", onDataChange);

    return () => {
      CityDataService.getAll().off("value", onDataChange);
    };
  }, []);

  const refreshList = () => {
    setCurrentCity(null);
    setCurrentIndex(-1);
  };

  const setActiveCity = (city, index) => {
    const { name, state, country } = city;

    setCurrentCity({
      key: city.key,
      name,
      state,
      country,
    });

    setCurrentIndex(index);
  };

  const removeAllCities = () => {
    CityDataService.removeAll()
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
        <h4>Lista de Cidades</h4>
        <select class="form-select" aria-label="Default select example" onChange={(e)=>{setSelection(e.target.value)}}>
          <option selected hidden>Estados</option>
          <option value="Todos">Todos</option>
          <option value="AC">Acre</option>
        	<option value="AL">Alagoas</option>
        	<option value="AP">Amapá</option>
        	<option value="AM">Amazonas</option>
        	<option value="BA">Bahia</option>
        	<option value="CE">Ceará</option>
        	<option value="DF">Distrito Federal</option>
        	<option value="ES">Espírito Santo</option>
        	<option value="GO">Goiás</option>
        	<option value="MA">Maranhão</option>
        	<option value="MT">Mato Grosso</option>
        	<option value="MS">Mato Grosso do Sul</option>
        	<option value="MG">Minas Gerais</option>
        	<option value="PA">Pará</option>
        	<option value="PB">Paraíba</option>
        	<option value="PR">Paraná</option>
        	<option value="PE">Pernambuco</option>
        	<option value="PI">Piauí</option>
        	<option value="RJ">Rio de Janeiro</option>
        	<option value="RN">Rio Grande do Norte</option>
        	<option value="RS">Rio Grande do Sul</option>
        	<option value="RO">Rondônia</option>
        	<option value="RR">Roraima</option>
        	<option value="SC">Santa Catarina</option>
        	<option value="SP">São Paulo</option>
        	<option value="SE">Sergipe</option>
        	<option value="TO">Tocantins</option>
        </select>
        <hr />
        <ul className="list-group">
          {cities
            .filter((city) => {
              if(city.state == selection || selection == "Todos") return city
            })
            .map((city, index) => (
            <li
              className={"list-group-item " + (index === currentIndex ? "active" : "")}
              onClick={() => setActiveCity(city, index)}
              key={index}
            >
              {city.name}
            </li>
          ))}
        </ul>

        // <button
        //   className="m-3 btn btn-sm btn-danger"
        //   onClick={removeAllCities}
        // >
        //   Remove All
        // </button>
      </div>
      <div className="col-md-6">
        {currentCity ? (
          <City city={currentCity} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a City...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitiesList;

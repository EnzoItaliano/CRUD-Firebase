import React, { useState, useEffect } from "react";
import ProfessionalDataService from "../../services/ProfessionalService";
import CityDataService from "../../services/CitiesService";
import ServiceDataService from "../../services/ServicesService";
import Professional from "./Professional";

const ProfessionalsList = () => {
  const [professionals, setProfessionals] = useState([]);
  const [servicesAvailable, setServicesAvailable] = useState([]);
  const [citiesAvailable, setCitiesAvailable] = useState([]);
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [currentProfessional, setCurrentProfessional] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selection, setSelection] = useState(true);

  const onDataChange = (items) => {
    let professionals = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      professionals.push({
        key: key,
        name: data.name,
        picture: data.picture,
        email: data.email,
        birthday: data.birthday,
        gender: data.gender,
        phone: data.phone,
        state: data.state,
        city: data.city,
        cidades: data.cidades,
        servicos: data.servicos,
        description: data.description,
        w2w: data.w2w,
        terms: data.terms,
        highlight: data.highlight,
        published: data.published
      });
    });
    professionals.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    })
    setProfessionals(professionals);
  };

  const retrieveCidades = (items) => {
    let cidades = [];
    let estados = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      cidades.push({
        key: key,
        name: data.name,
        state: data.state,
        country: data.country,
      });
      estados.push(data.state)
    });

    cidades.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    })

    estados.sort(function (a, b) {
      return a.localeCompare(b);
    })

    let set = new Set(estados)
    estados = Array.from(set)
    setStates(estados)
    setCitiesAvailable(cidades)
  }

  const retrieveServicos = (items) => {
    let servicos = [];
    let categorias = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      servicos.push({
        key: key,
        name: data.name,
        category: data.category,
      });
      categorias.push(data.category)
    });

    servicos.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    })

    categorias.sort(function (a, b) {
      return a.localeCompare(b);
    })

    let set = new Set(categorias)
    categorias = Array.from(set)
    setCategories(categorias)
    setServicesAvailable(servicos)
  }

  useEffect(() => {
    ProfessionalDataService.getAll().on("value", onDataChange);
    CityDataService.getAll().on("value", retrieveCidades);
    ServiceDataService.getAll().on("value", retrieveServicos);

    return () => {
      ProfessionalDataService.getAll().off("value", onDataChange);
      CityDataService.getAll().off("value", retrieveCidades);
      ServiceDataService.getAll().off("value", retrieveServicos);
    };
  }, []);

  const refreshList = () => {
    setCurrentProfessional(null);
    setCurrentIndex(-1);
  };

  const setActiveProfessional = (professional, index) => {
    if(professional.cidades === undefined){
      professional.cidades = []
    }
    if(professional.servicos === undefined){
      professional.servicos = []
    }
    
    const { 
      name,
      picture,
      email,
      birthday,
      gender,
      phone,
      state,
      city,
      cidades,
      servicos,
      description,
      w2w,
      terms,
      highlight,
      published
    } = professional;

    setCurrentProfessional({
      key: professional.key,
      name,
      picture,
      email,
      birthday,
      gender,
      phone,
      state,
      city,
      cidades,
      servicos,
      description,
      w2w,
      terms,
      highlight,
      published
    });

    setCurrentIndex(index);
  };

  const removeAllProfessionals = () => {
    ProfessionalDataService.removeAll()
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
        <h4>Lista de Profissionais</h4>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            if(e.target.value === 'true'){
              setSelection(true)
            }else{
              setSelection(false)
            }
          }}
        >
          <option selected hidden>Categorias</option>
          <option value={new Boolean(true)}>Publicados</option>
          <option value={new Boolean(false)}>Não Publicados</option>
        </select>
        <hr />
        <ul className="list-group">
          {professionals
            .filter((professional) => {
              if(professional.published === selection){
                return professional
              }
            })
            .map((professional, index) => (
            <li
              className={"list-group-item " + (index === currentIndex ? "active" : "")}
              onClick={() => setActiveProfessional(professional, index)}
              key={index}
            >
              {professional.name}
            </li>
          ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentProfessional ? (
          <Professional professional={currentProfessional} states={states} cities={citiesAvailable} categories={categories} services={servicesAvailable} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Por favor clique em um profissional...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsList;

import React, { useState, useEffect } from "react";
import ProfessionalDataService from "../../services/ProfessionalService";
import Professional from "./Professional";

const ProfessionalsList = () => {
  const [professionals, setProfessionals] = useState([]);
  const [currentProfessional, setCurrentProfessional] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selection, setSelection] = useState("Todas");

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
        published: data.published
      });
    });
    professionals.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    })
    setProfessionals(professionals);
  };

  useEffect(() => {
    ProfessionalDataService.getAll().on("value", onDataChange);

    return () => {
      ProfessionalDataService.getAll().off("value", onDataChange);
    };
  }, []);

  const refreshList = () => {
    setCurrentProfessional(null);
    setCurrentIndex(-1);
  };

  const setActiveProfessional = (professional, index) => {
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
          {professionals
            // .filter((service) => {
            //   if(service.category == selection || selection == "Todas") return service
            // })
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
          <Professional professional={currentProfessional} refreshList={refreshList} />
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

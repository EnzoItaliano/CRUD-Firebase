import React, { useState } from "react";
import ProfessionalDataService from "../../services/ProfessionalService";
import { BsFillBackspaceFill, BsFillPlusCircleFill } from "react-icons/bs";

const Professional = (props) => {
  const initialProfessionalState = {
    key: null,
    name: "",
    picture: "",
    email: "",
    birthday: "",
    gender: "",
    phone: "",
    state: "",
    city: "",
    cidades: [],
    servicos: []
  };
  const [currentProfessional, setCurrentProfessional] = useState(initialProfessionalState);
  const [message, setMessage] = useState("");

  const { professional } = props;
  if (currentProfessional.key !== professional.key) {
    setCurrentProfessional(professional);
    setMessage("");
  }
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProfessional({ ...currentProfessional, [name]: value });
  };

  const updateProfessional = () => {
    const data = {
      name: currentProfessional.name,
      email: currentProfessional.email,
      birthday: currentProfessional.birthday,
      gender: currentProfessional.gender,
      phone: currentProfessional.phone,
      state: currentProfessional.state,
      city: currentProfessional.city,
    };

    ProfessionalDataService.update(currentProfessional.key, data)
      .then(() => {
        setMessage("O profissional foi atualizado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProfessional = () => {
    ProfessionalDataService.remove(currentProfessional.key)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addCidade = (event) => {
    event.preventDefault()
    let city = prompt("Insira o nome da cidade")
    if (city !== null && city !== ""){
      let cities = currentProfessional.cidades
      cities.push(city)
      setCurrentProfessional({ ...currentProfessional, cidades: cities });
    }
  }

  const deleteCidade = (event, value) => {
    event.preventDefault()
    let cities = currentProfessional.cidades
    cities.splice(value,1)
    setCurrentProfessional({ ...currentProfessional, cidades: cities });
  }
  
  const addServico = (event) => {
    event.preventDefault()
    let service = prompt("Insira o nome do serviço")
    if (service !== null && service !== ""){
      let services = currentProfessional.servicos
      services.push(service)
      setCurrentProfessional({ ...currentProfessional, servicos: services });
    }
  }

  const deleteServico = (event, value) => {
    event.preventDefault()
    let services = currentProfessional.servicos
    services.splice(value,1)
    setCurrentProfessional({ ...currentProfessional, servicos: services });
  }

  return (
    <div>
      {currentProfessional ? (
        <div className="edit-form">
          <h4>Profissional</h4>
          <form>
            <div className="form-group">
              <img class="img-fluid" src={currentProfessional.picture}/>
            </div>

            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProfessional.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentProfessional.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthday">Data de Nascimento</label>
              <input
                type="text"
                className="form-control"
                id="birthday"
                name="birthday"
                value={currentProfessional.birthday}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gênero</label>
              <select className="form-select" id="gender" name="gender" value={currentProfessional.gender} onChange={handleInputChange}>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Prefiro não dizer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Celular</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={currentProfessional.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">Estado</label>
              <select className="form-select" id="state" name="state" value={currentProfessional.state} onChange={handleInputChange}>
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
            </div>

            <div className="form-group">
              <label htmlFor="phone">Cidade</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={currentProfessional.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Cidades</label>
              <div>
                {currentProfessional.cidades.map((cidade, index) => (
                  <button key={index} className="badge bg-light mx-1 my-1 border border-light text-body fs-6" onClick={(e) => deleteCidade(e, index)}>
                    {cidade}&nbsp;&nbsp;&nbsp;<BsFillBackspaceFill />
                  </button>
                ))}
              </div>
              <button className="badge bg-success mr-2 border border-success" onClick={addCidade}>
                <BsFillPlusCircleFill />
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Serviços</label>
              <div>
                {currentProfessional.servicos.map((servico, index) => (
                  <button key={index} className="badge bg-light mx-1 my-1 border border-light text-body fs-6" value={index} onClick={(e) => deleteServico(e, index)}>
                    {servico}&nbsp;&nbsp;&nbsp;<BsFillBackspaceFill />
                  </button>
                ))}
              </div>
              <button className="badge bg-success mr-2 border border-success" onClick={addServico}>
                <BsFillPlusCircleFill />
              </button>
            </div>

          </form>

          <button className="badge bg-danger mr-2" onClick={deleteProfessional}>
            Apagar
          </button>

          <button
            type="submit"
            className="badge bg-success"
            onClick={updateProfessional}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor clique em um profissional...</p>
        </div>
      )}
    </div>
  );
};

export default Professional;

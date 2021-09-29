import React, { useState } from "react";
import ProfessionalDataService from "../../services/ProfessionalService";
import { BsFillBackspaceFill, BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

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
    servicos: [],
    description: "",
    w2w: "",
    terms: "",
    highlight: false,
    published: false
  };
  const [currentProfessional, setCurrentProfessional] = useState(initialProfessionalState);
  const [tempService, setTempService] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [message, setMessage] = useState("");

  const { professional, states, cities, categories, services } = props;
  if (currentProfessional.key !== professional.key) {
    setCurrentProfessional(professional);
    setMessage("");
  }
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name === 'w2w' || name === 'highlight' || name === 'published'){
      if(value === 'true')
        setCurrentProfessional({ ...currentProfessional, [name]: true });
      else
        setCurrentProfessional({ ...currentProfessional, [name]: false });
    }else{
      setCurrentProfessional({ ...currentProfessional, [name]: value });
    }
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
      cidades: currentProfessional.cidades,
      servicos: currentProfessional.servicos,
      description: currentProfessional.description,
      w2w: currentProfessional.w2w,
      highlight: currentProfessional.highlight,
      published: currentProfessional.published
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
    ProfessionalDataService.deleteImage(currentProfessional.email)
      .then(() => {
        ProfessionalDataService.remove(currentProfessional.key)
          .then(() => {
            props.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      })
  };

  const handleCitySelect = (event) => {
    const { value } = event.target;
    setTempCity(value)
  }

  const addCidade = (event) => {
    event.preventDefault()
    let cities = currentProfessional.cidades
    cities.push(tempCity)
    setCurrentProfessional({ ...currentProfessional, cidades: cities });
  }

  const deleteCidade = (event, value) => {
    event.preventDefault()
    let cities = currentProfessional.cidades
    cities.splice(value,1)
    setCurrentProfessional({ ...currentProfessional, cidades: cities });
  }

  const handleServiceSelect = (event) => {
    const { value } = event.target;
    setTempService(value)
  }
  
  const addServico = (event) => {
    event.preventDefault()
    let services = currentProfessional.servicos
    services.push(tempService)
    setCurrentProfessional({ ...currentProfessional, servicos: services });
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
              <label htmlFor="name" class="my-1">Nome</label>
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                name="name"
                value={currentProfessional.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" class="my-1" disabled>Email</label>
              <input
                type="text"
                className="form-control mb-2"
                id="email"
                name="email"
                value={currentProfessional.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthday" class="my-1">Data de Nascimento</label>
              <input
                type="text"
                className="form-control mb-2"
                id="birthday"
                name="birthday"
                value={currentProfessional.birthday}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender" class="my-1">Gênero</label>
              <select className="form-select mb-2" id="gender" name="gender" value={currentProfessional.gender} onChange={handleInputChange}>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Prefiro não dizer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phone" class="my-1">Celular</label>
              <input
                type="text"
                className="form-control mb-2"
                id="phone"
                name="phone"
                value={currentProfessional.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state" class="my-1">Estado</label>
              <select className="form-select mb-2" id="state" name="state" value={currentProfessional.state} onChange={handleInputChange}>
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
              <label htmlFor="city" class="my-1">Cidade</label>
              <input
                type="text"
                className="form-control mb-2"
                id="city"
                name="city"
                value={currentProfessional.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cidades" class="my-1">Cidades</label>
              <div>
                {currentProfessional.cidades.map((cidade, index) => (
                  <button key={index} className="badge bg-light mx-1 my-1 border border-light text-body fs-6" onClick={(e) => deleteCidade(e, index)}>
                    {cidade}&nbsp;&nbsp;&nbsp;<BsFillBackspaceFill />
                  </button>
                ))}
              </div>
              <button type="button" class="badge bg-success mr-2 border border-success" data-toggle="modal" data-target="#cityModal">
                <BsFillPlusCircleFill />
              </button>
              <div class="mb-2"></div>

              <div class="modal fade" id="cityModal" tabIndex="-1" role="dialog" aria-labelledby="cityModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="serviceModalLabel">Adicionar Cidade</h5>
                      <button type="button" class="btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><AiOutlineClose/></span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <select className="form-select" onChange={handleCitySelect}>
                      <option selected disabled hidden>Selecione uma cidade</option>
                        {states.map((state, index) => (
                          <optgroup key={index} class="text-body" label={state}>
                          {cities
                            .filter((city) => {
                              if(city.state === state){
                                return city
                              }
                            })
                            .map((city, index) => (
                            <option key={index} value={city.name}>{city.name}</option>
                          ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => setTempCity("")}>Cancelar</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={addCidade}>Salvar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="servicos" class="my-1">Serviços</label>
              <div>
                {currentProfessional.servicos.map((servico, index) => (
                  <button key={index} className="badge bg-light mx-1 my-1 border border-light text-body fs-6" value={index} onClick={(e) => deleteServico(e, index)}>
                    {servico}&nbsp;&nbsp;&nbsp;<BsFillBackspaceFill />
                  </button>
                ))}
              </div>
              <button type="button" class="badge bg-success mr-2 border border-success" data-toggle="modal" data-target="#serviceModal">
                <BsFillPlusCircleFill />
              </button>
              <div class="mb-2"></div>

              <div class="modal fade" id="serviceModal" tabIndex="-1" role="dialog" aria-labelledby="serviceModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="serviceModalLabel">Adicionar Serviço</h5>
                      <button type="button" class="btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><AiOutlineClose/></span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <select className="form-select" onChange={handleServiceSelect}>
                        <option selected disabled hidden>Selecione um serviço</option>
                        {categories.map((category, index) => (
                          <optgroup key={index} class="text-body" label={category}>
                          {services
                            .filter((service) => {
                              if(service.category === category){
                                return service
                              }
                            })
                            .map((service, index) => (
                            <option key={index} value={service.name}>{service.name}</option>
                          ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => setTempService("")}>Cancelar</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={addServico}>Salvar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description" class="my-1">Descrição</label>
              <textarea
                type="text"
                rows="5"
                maxLength="420"
                class="form-control mb-2"
                aria-label="Textarea"
                id="description"
                name="description"
                value={currentProfessional.description}
                onChange={handleInputChange}
              >
              </textarea>
            </div>

            <div className="form-group">
              <label htmlFor="w2w" class="my-1">W2W</label>
              <select className="form-select mb-2" id="w2w" name="w2w" value={currentProfessional.w2w} onChange={handleInputChange}>
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="highlight" class="my-1">Destaque</label>
              <select className="form-select mb-2" id="highlight" name="highlight" value={currentProfessional.highlight} onChange={handleInputChange}>
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="published" class="my-1">Publicado</label>
              <select className="form-select mb-2" id="published" name="published" value={currentProfessional.published} onChange={handleInputChange}>
                <option value={true} className="text-success">Sim</option>
                <option value={false} className="text-danger">Não</option>
              </select>
            </div>

          </form>

          <button type="submit" className="badge bg-danger mx-2" data-toggle="modal" data-target="#deleteModal">
            Apagar
          </button>

          <div class="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="serviceModalLabel">Atualizar profissional</h5>
                  <button type="button" class="btn" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><AiOutlineClose/></span>
                  </button>
                </div>
                <div class="modal-body">
                  Você deseja mesmo apagar este profissional?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={deleteProfessional}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="badge bg-success" data-toggle="modal" data-target="#updateModal">
            Atualizar
          </button>

          <div class="modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="serviceModalLabel">Apagar profissional</h5>
                  <button type="button" class="btn" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><AiOutlineClose/></span>
                  </button>
                </div>
                <div class="modal-body">
                  Você deseja mesmo atualizar este profissional?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={updateProfessional}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>

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

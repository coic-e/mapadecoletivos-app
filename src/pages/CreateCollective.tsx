import React, { ChangeEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../styles/pages/create-collective.css";
import mapIcon from "../utils/mapIcon";
import Sidebar from "../components/Sidebar/Sidebar";

interface Option {
  value: string;
  label: string;
}

const optionsUf: Option[] = [
  { value: "AL", label: "AL" },
  { value: "AP", label: "AP" },
  { value: "AM", label: "AM" },
  { value: "BA", label: "BA" },
  { value: "CE", label: "CE" },
  { value: "DF", label: "DF" },
  { value: "ES", label: "ES" },
  { value: "GO", label: "GO" },
  { value: "MA", label: "MA" },
  { value: "MT", label: "MT" },
  { value: "MS", label: "MS" },
  { value: "MG", label: "MG" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PR", label: "PR" },
  { value: "PE", label: "PE" },
  { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" },
  { value: "RN", label: "RN" },
  { value: "RS", label: "RS" },
  { value: "RO", label: "RO" },
  { value: "RR", label: "RR" },
  { value: "SC", label: "SC" },
  { value: "SP", label: "SP" },
  { value: "SE", label: "SE" },
  { value: "TO", label: "TO" },
];

interface FormData {
  name: string;
  about: string;
  email: string;
  uf: string;
  city: string;
  tipo: string;
  // other form fields...
}

function CreateCollective() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    about: "",
    email: "",
    uf: "",
    city: "",
    tipo: "",
    // other form fields...
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const radioOptions = ["festa", "festarua", "festival", "label", "radiopodcast", "nucleo", "club", "bar", "produtora", "portalblog", "outro"];

  return (
    <div id="page-create-collective">
      <Sidebar />

      <main>
        <form className="create-collective-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-30.0313778, -51.2256725]}
              zoom={16}
              style={{ width: "100%", height: 280 }}
              dragging={false}
              zoomControl={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              <Marker
                interactive={false}
                icon={mapIcon}
                position={[-30.0313778, -51.2256725]}
              ></Marker>
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nome"/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" name="about" maxLength={300} value={formData.about} onChange={handleInputChange}></textarea>
            </div>

            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>

            <div className="input-block-container">
              <div className="input-block select">
                <label htmlFor="uf">UF</label>
                <select id="uf" name="uf" value={formData.uf} onChange={handleInputChange}>
                  {optionsUf.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="input-block">
                <label htmlFor="city">Cidade</label>
                <input id="city" name="city" value={formData.city} onChange={handleInputChange} />
              </div>
            </div>

            <div className="container">
              <label className="flex-item">O Coletivo é?</label>
              <div className="wrapper">
                {radioOptions.map((option) => (
                  <label className="flex-item" key={option}>
                    <input type="radio" value={option} name="tipo" onChange={handleInputChange}/>
                    <span>{option}</span>
                  </label>
                ))}
                <div className="input-block input">
                  <input id="name" />
                </div>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image"></div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateCollective;


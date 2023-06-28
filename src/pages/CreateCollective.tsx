import React from "react";
import { FiPlus } from "react-icons/fi";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Select from "react-select";

import "../styles/pages/create-collective.css";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

const optionsUf = [
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

function CreateCollective() {
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
              <input id="name" placeholder="Nome"/>
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea id="name" maxLength={300}></textarea>
            </div>

            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input id="name" />
            </div>

            <div className="input-block-container">
              <div className="input-block select">
                <label htmlFor="uf">UF</label>
                <select>
                  <option value="teste">TESTE</option>
                </select>
              </div>

              <div className="input-block">
                <label htmlFor="city">Cidade</label>
                <input id="name" />
              </div>
            </div>

            <div className="container">
              <label className="flex-item">O Coletivo é?</label>
              <div className="wrapper">
                <label className="flex-item">
                  <input type="radio" value="festa" name="tipo" />
                  <span>Festa</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="festarua" name="tipo" />
                  <span>Festa de rua</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="festival" name="tipo" />
                  <span>Festival</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="label" name="tipo" />
                  <span>Label</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="radiopodcast" name="tipo" />
                  <span>Rádio/Podcast</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="nucleo" name="tipo" />
                  <span>Núcleo</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="club" name="tipo" />
                  <span>Club</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="bar" name="tipo" />
                  <span>Bar</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="produtora" name="tipo" />
                  <span>Produtora</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="portalblog" name="tipo" />
                  <span>Portal/Blog</span>
                </label>

                <label className="flex-item">
                  <input type="radio" value="outro" name="tipo" />
                  <span>Outro</span>
                </label>

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

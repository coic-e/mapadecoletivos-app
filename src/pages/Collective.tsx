import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "../styles/pages/collective.css";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

function Collective() {
  return (
    <div id="page-collective">
      <Sidebar />

      <main>
        <div className="collective-details">
          <img
            src="http://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
            alt="Coletivo Teste"
          />
          <div className="images">
            <button className="active" type="button">
              <img
                src="http://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Coletivo Teste"
              />
            </button>

            <button type="button">
              <img
                src="http://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Coletivo Teste"
              />
            </button>
            <button type="button">
              <img
                src="http://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Coletivo Teste"
              />
            </button>
            <button type="button">
              <img
                src="http://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Coletivo Teste"
              />
            </button>
            <button type="button">
              <img
                src="http://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Coletivo Teste"
              />
            </button>
            <button type="button">
              <img
                src="http://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Coletivo Teste"
              />
            </button>
          </div>

          <div className="collective-details-content">
            <h1>Coletivo Teste</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>

            <div className="map-container">
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

              <footer>
                <Link to="">Ver rotas no Google Maps</Link>
              </footer>
            </div>

            <hr />

            <button type="button" className="contact-button">
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Collective;

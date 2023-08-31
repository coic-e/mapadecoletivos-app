import React, { ChangeEvent, useEffect, useState } from "react";
import { FiDelete, FiPlus, FiXSquare } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "../styles/pages/create-collective.css";
import mapIcon from "../utils/mapIcon";
import Sidebar from "../components/Sidebar/Sidebar";
import api from "../services/api";
import { useHistory } from "react-router-dom";

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
  type: string;
  latitude: string;
  longitude: string;
  social: string;
  images?: File[];
}

function CreateCollective() {
  const history = useHistory();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    about: "",
    email: "",
    uf: "",
    city: "",
    type: "",
    latitude: "",
    longitude: "",
    social: "",
    images: [],
  });

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const radioOptions = [
    "festa",
    "festarua",
    "festival",
    "label",
    "radiopodcast",
    "nucleo",
    "club",
    "bar",
    "produtora",
    "portalblog",
    "outro",
  ];

  const handleMapClick = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setFormData({
      ...formData,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("about", formData.about);
    data.append("email", formData.email);
    data.append("uf", formData.uf);
    data.append("city", formData.city);
    data.append("type", formData.type);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("social", formData.social);
    
    images.forEach((image) => {
      data.append("images", image);
    });

    await api.post("collectives", data).then((response) => {
      alert("Cadastro realizado com sucesso!");
      history.push("/app");
    });
  };

  const handleSelectedImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  return (
    <div id="page-create-collective">
      <Sidebar />

      <main>
        <form className="create-collective-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-30.0313778, -51.2256725]}
              zoom={16}
              style={{ width: "100%", height: 280 }}
              scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <MapClickHandler onClick={handleMapClick} />
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                name="about"
                maxLength={300}
                value={formData.about}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="social">Social</label>
              <input
                id="social"
                name="social"
                value={formData.social}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-block-container">
              <div className="input-block select">
                <label htmlFor="uf">UF</label>
                <select
                  id="uf"
                  name="uf"
                  value={formData.uf}
                  onChange={handleInputChange}
                >
                  {optionsUf.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-block">
                <label htmlFor="city">Cidade</label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="container">
              <label className="flex-item">O Coletivo é?</label>
              <div className="wrapper">
                {radioOptions.map((option) => (
                  <label className="flex-item" key={option}>
                    <input
                      type="radio"
                      value={option}
                      name="type"
                      onChange={handleInputChange}
                    />
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

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={image} className="image-item">
                      <img key={image} src={image} alt={formData.name} />;
                      <button onClick={() => handleDeleteImage(index)}>
                        <FiXSquare color="#000" />
                      </button>
                    </div>
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectedImage}
                type="file"
                id="image[]"
              />
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

function MapClickHandler({
  onClick,
}: {
  onClick: (lat: number, lng: number) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null); // To hold the position state

  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onClick(e.latlng.lat, e.latlng.lng);
      // Here, you can also update your formData state with these coordinates if needed
    },
    // You can also handle other map events here if needed
  });

  return position ? (
    <Marker position={position} interactive={false} icon={mapIcon} />
  ) : null; // Render marker on click position, or nothing if not clicked yet
}

export default CreateCollective;

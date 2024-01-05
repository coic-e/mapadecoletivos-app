import React, { ChangeEvent, useEffect, useState } from "react";
import { FiDelete, FiPlus, FiXSquare } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "../styles/pages/create-collective.css";
import mapIcon from "../utils/mapIcon";
import Sidebar from "../components/Sidebar/Sidebar";
import api from "../services/api";
import useZodForm from "../hooks/useZodForm";
const { VITE_USERNAME, VITE_STYLE_ID, VITE_ACCESS_TOKEN } = import.meta.env;
import { FormData } from "../interfaces/FormData";
import { Option } from "../interfaces/OptionUf";

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

const raveTypeOptions = [
  "Festa",
  "Festival",
  "Label",
  "Radio",
  "Podcast",
  "Coletivo",
  "Nucleo",
  "Club",
  "Bar",
  "Produtora",
  "outro",
];

function CreateCollective() {
  const history = () => {};

  const {
    handleSubmit,
    register,
    onSubmit,
    isSubmitting,
    errors,
    images,
    setImages,
    setValue,
  } = useZodForm();

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  const handleMapClick = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setValue("latitude", lat.toString());
    setValue("longitude", lng.toString());
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const handleSelectedImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    
    const selectedImages = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages((prevPreviewImages) => [
      ...prevPreviewImages,
      ...selectedImagesPreview,
    ]);
  }

  return (
    <div id="page-create-collective">
      <Sidebar />

      <main>
        <form
          className="create-collective-form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                url={`https://api.mapbox.com/styles/v1/${VITE_USERNAME}/${VITE_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_ACCESS_TOKEN}`}
              />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                {...register("name")}
                onChange={handleInputChange}
              />
            </div>

            {errors?.name && <span>{errors.name.message}</span>}

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                {...register("about")}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {errors?.about && <span>{errors.about.message}</span>}

            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                {...register("email")}
                onChange={handleInputChange}
              />
            </div>

            {errors?.email && <span>{errors.email.message}</span>}

            <div className="input-block">
              <label htmlFor="social">Social</label>
              <input
                id="social"
                {...register("social")}
                onChange={handleInputChange}
              />
            </div>

            {errors?.social && <span>{errors.social.message}</span>}

            <div className="input-block">
              <div className="input-block select">
                <label htmlFor="uf">UF</label>
                <select
                  id="uf"
                  {...register("uf")}
                  onChange={handleInputChange}
                >
                  {optionsUf.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      {...register("uf")}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {errors?.uf && <span>{errors.uf.message}</span>}

            <div className="input-block">
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                {...register("city")}
                onChange={handleInputChange}
              />
            </div>

            {errors?.city && <span>{errors.city.message}</span>}

            <div className="input-block">
              <div className="input-block select">
                <label htmlFor="rave-type">Tipo</label>
                <select
                  id="rave-type"
                  {...register("type")}
                  onChange={handleInputChange}
                >
                  {raveTypeOptions.map((option) => (
                    <option key={option} value={option} {...register("type")}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {errors?.type && <span>{errors.type.message}</span>}

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={image} className="image-item">
                      <img key={image} src={image} alt={formData.name} />
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

          <button
            className="confirm-button"
            type="submit"
            disabled={isSubmitting}
          >
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

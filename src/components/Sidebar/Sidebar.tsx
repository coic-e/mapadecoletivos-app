import React from "react";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import iconDiscoBall from "../../images/discoball-pequeno.svg";

// import Discoball from "./Discoball";

import "./sidebar.css";

function Sidebar() {
  const { goBack } = useHistory();

  // const handleGoBack = () => {
  //   if (history.length > 2) {
  //     history.goBack();
  //   } else {
  //     history.push("/defaultpath"); //replace /defaultpath with your actual default route
  //   }
  // };

  return (
    <aside className="app-sidebar">
      <div className="group-icons"></div>
      <img src={iconDiscoBall} alt="Collective" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}

export default Sidebar;

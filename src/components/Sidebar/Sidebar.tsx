import React from "react";
import { FiArrowLeft } from "react-icons/fi";

// import iconDiscoBall from ". images/discoball-pequeno.svg";

// import Discoball from "./Discoball";

import "./sidebar.css";

function Sidebar() {

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
      <img alt="Collective" />

      <footer>
        <button type="button">
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}

export default Sidebar;

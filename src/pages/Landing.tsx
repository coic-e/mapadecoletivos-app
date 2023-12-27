import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "../styles/pages/landing.css";

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <main>
          <h1>MAPA DE RAVE</h1>
          <p>Descubra a Batida do Underdroung</p>
        </main>

        <Link to="/raves" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;

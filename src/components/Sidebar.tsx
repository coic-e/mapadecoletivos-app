import React from 'react'
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import iconDiscoBall from "../images/discoball-pequeno.svg";

// import Discoball from "./Discoball";

import '../styles/components/sidebar.css'

function Sidebar(){
    const { goBack } = useHistory();
    return (        
        <aside className="app-sidebar">
        <img src={iconDiscoBall} alt="Collective" />
        {/* <Discoball/> */}

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    );
}

export default Sidebar;
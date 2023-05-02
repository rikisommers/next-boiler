import React, { useState, useEffect, useCallback} from "react";
import { motion } from "framer-motion";

const Reel = (show, title, content) => {
    
    const [showModal, setShowModal] = useState(show);

  return (
    <>
         {showModal ? (

        <header className="c-reel">

        <div className="c-reel--content">
            <h2>sdfdsfdsfs</h2>
            <p>sdfdsfdsfdsfdsfsdfds</p>
        </div>

        <div className="c-reel--skip">
            <button onClick={() => setShowModal(false)}
            >Skip</button>
        </div>
        </header> 
      ) : null}

        </>
  );
};


export default Reel;

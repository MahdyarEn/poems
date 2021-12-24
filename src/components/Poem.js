import React from "react";
import styles from "./Poem.module.css";
import icon from "./images.jpg";
const Poem = ({ hemistich1, hemistich2, poet }) => {
  return (
    <div className={`${styles.poetry} shadow`}>
      <img src={icon} />
      <div>
        <div>
          <h2>{hemistich2}</h2>
          <h2>{hemistich1}</h2>
        </div>
      </div>
    </div>
  );
};

export default Poem;

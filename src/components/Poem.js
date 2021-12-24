import React from "react";
import styles from "./Poem.module.css";
import noProfile from "../pictures/noProf.png";
const Poem = ({ hemistich1, hemistich2, poet }) => {
  const findPoetPictures = (poet) => {
    if (poet.includes("مولوی")) {
      return "molavi.jpg";
    } else if (poet.includes("فردوسی")) {
      return "ferdosi.jpg";
    } else if (poet.includes("حافظ")) {
      return "hafez.jpg";
    } else if (poet.includes("سعدی")) {
      return "saadi.jpg";
    } else if (poet.includes("خیام")) {
      return "khayam.jpg";
    } else if (poet.includes("امیرخسرو دهلوی")) {
      return "khosroDehlavi.jpg";
    } else if (poet.includes("نظامی")) {
      return "nezami.jpg";
    } else if (poet.includes("صائب")) {
      return "saeb.jpg";
    } else if (poet.includes("ناصرخسرو")) {
      return "naserKhosro.jpg";
    } else if (poet.includes("پروین اعتصامی")) {
      return "parvin.jpg";
    } else if (poet.includes("عطار")) {
      return "atar.jpg";
    } else if (poet.includes("بیدل")) {
      return "bidel.jpg";
    } else if (poet.includes("هوشنگ ابتهاج")) {
      return "ebtehaj.jpg";
    } else if (poet.includes("جامی")) {
      return "jami.jpg";
    } else if (poet.includes("خاقانی")) {
      return "khaghani.jpg";
    } else if (poet.includes("شهریار")) {
      return "shahriar.jpg";
    } else if (poet.includes("شیخ بهایی")) {
      return "sheykh.jpg";
    } else if (poet.includes("فاضل نظری")) {
      return "fazelNazari.jpg";
    } else if (poet.includes("قاآنی")) {
      return "ghaani.jpg";
    } else if (poet.includes("فریدون مشیری")) {
      return "Fereydoon_Moshiri.jpg";
    } else if (poet.includes("قیصر امین")) {
      return "gheysarAminPoor.jpg";
    } else if (poet.includes("ملک‌الشعرای بهار")) {
      return "maleko.jpg";
    } else if (poet.includes("وحشی")) {
      return "vahshi.jpg";
    } else {
      return "noProf.png";
    }
  };

  return (
    <div className={`${styles.poetry} shadow`}>
      <img
        title={poet}
        src={(() => {
          let poetImage;
          try {
            poetImage = require(`../pictures/${findPoetPictures(poet)}`);
          } catch (err) {
            poetImage = noProfile;
          }
          return poetImage;
        })()}
      />
      <div>
        <div>
          <h2>{hemistich1}</h2>
          <h2>{hemistich2}</h2>
        </div>
      </div>
    </div>
  );
};

export default Poem;

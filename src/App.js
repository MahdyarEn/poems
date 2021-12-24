import React, { useState, useEffect, useRef, useMemo } from "react";

// import Components
import Header from "./components/Header";
import Select from "react-select";
import Poem from "./components/Poem";

// Api
import { getPoems } from "./services/poems";

const App = () => {
  // States
  const [data, setData] = useState([]);
  const [firstLetterOptions, setFirstLetterOptions] = useState(null);
  const [lastLetterOptions, setLastLetterOptions] = useState(null);
  const [pt, setpt] = useState(null);
  const [poem, setPoem] = useState({ index: 10 });
  const [input, setInput] = useState("");

  // Refs
  let firstLetterAllowed = useRef([]);
  let lastLetterAllowed = useRef([]);
  let poetAllowed = useRef([]);

  // Get poems from API
  useEffect(() => {
    const fetchApi = async () => {
      const poems = await getPoems();
      setData(poems);
    };
    fetchApi();
  }, []);

  // #
  useEffect(() => {
    setPoem({ index: 10 });
  }, [firstLetterOptions]);

  // firstLetter
  firstLetterAllowed.current = [];
  firstLetterOptions?.map((item) => {
    firstLetterAllowed.current.push(item.value);
  });

  // LastLetter
  lastLetterAllowed.current = [];
  lastLetterOptions?.map((item) => {
    lastLetterAllowed.current.push(item.value);
  });

  // PoetLetter
  poetAllowed.current = [];
  pt?.map((item) => {
    poetAllowed.current.push(item.value);
  });

  const check = data.filter((item) => {
    if (firstLetterAllowed.current.some((v) => item.firstLetter.includes(v)) && lastLetterAllowed.current.some((v) => item.lastLetter.includes(v)) && poetAllowed.current.some((v) => item.poet.includes(v)) && (item.hemistich1.includes(input) || item.hemistich2.includes(input))) {
      return true;
    }
    return false;
  });

  // Limit poems 10 by 10
  const limitCheck = () => {
    const array = [...check];
    return array.splice(0, poem.index);
  };

  // Add poems 10 by 10
  const clickHandler = () => {
    setPoem({ ...poem, index: (poem.index += 10) });
  };

  // Allowed Options for letters
  const options = [
    { value: "", label: "همه" },
    { value: "ا", label: "الف" },
    { value: "ب", label: "ب" },
    { value: "پ", label: "پ" },
    { value: "ت", label: "ت" },
    { value: "ث", label: "ث" },
    { value: "ج", label: "ج" },
    { value: "چ", label: "چ" },
    { value: "ح", label: "ح" },
    { value: "خ", label: "خ" },
    { value: "د", label: "د" },
    { value: "ذ", label: "ذ" },
    { value: "ر", label: "ر" },
    { value: "ز", label: "ز" },
    { value: "ژ", label: "ژ" },
    { value: "س", label: "س" },
    { value: "ش", label: "ش" },
    { value: "ص", label: "ص" },
    { value: "ض", label: "ض" },
    { value: "ط", label: "ط" },
    { value: "ظ", label: "ظ" },
    { value: "ع", label: "ع" },
    { value: "غ", label: "غ" },
    { value: "ف", label: "ف" },
    { value: "ق", label: "ق" },
    { value: "ک", label: "ک" },
    { value: "گ", label: "گ" },
    { value: "ل", label: "ل" },
    { value: "م", label: "م" },
    { value: "ن", label: "ن" },
    { value: "و", label: "و" },
    { value: "ه", label: "ه" },
    { value: "ی", label: "ی" },
  ];

  // Allowed Options for Poet

  const poetOptions = [
    { value: "", label: "همه" },
    { value: "حافظ", label: "حافظ" },
    { value: "سعدی", label: "سعدی" },
    { value: "مولوی", label: "مولوی" },
    { value: "فردوسی", label: "فردوسی" },
    { value: "نظامی", label: "نظامی" },
    { value: "صائب", label: "صائب" },
    { value: "عطار", label: "عطار" },
    { value: "بیدل دهلوی", label: "بیدل دهلوی" },
    { value: "پروین اعتصامی", label: "پروین اعتصامی" },
    { value: "هوشنگ ابتهاج", label: "هوشنگ ابتهاج" },
    { value: "امیرخسرو دهلوی", label: "امیرخسرو دهلوی" },
    { value: "جامی", label: "جامی" },
    { value: "خاقانی", label: "خاقانی" },
    { value: "شهریار", label: "شهریار" },
    { value: "دهلوی", label: "دهلوی" },
    { value: "شیخ بهایی", label: "شیخ بهایی" },
    { value: "فاضل نظری", label: "فاضل نظری" },
    { value: "قاآنی", label: "قاآنی" },
    { value: "فریدون مشیری", label: "فریدون مشیری" },
    { value: "قیصر امین‌پور", label: "قیصر امین‌پور" },
    { value: "ملک‌الشعرای بهار", label: "ملک‌الشعرای بهار" },
    { value: "وحشی بافقی", label: "وحشی بافقی" },
  ];

  // Search Hnadler
  const changeHandler = (event) => {
    setInput(event.target.value);
  };
  return (
    <div className="container">
      <Header />
      <div className="select-container">
        <Select placeholder={"حرف اول ..."} className="select-options" classNamePrefix="select" onChange={setFirstLetterOptions} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="first-letter" options={options} />
        <Select placeholder={"حرف آخر ..."} className="select-options" classNamePrefix="select" onChange={setLastLetterOptions} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="first-last" options={options} />
        <Select placeholder={"شاعر ..."} className="select-options" classNamePrefix="select" onChange={setpt} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="poet" options={poetOptions} />
      </div>
      <input type="text" placeholder="جستجو در متن شعر ..." className="input shadow" onChange={changeHandler}></input>
      {limitCheck()?.map((data, index) => (
        <Poem key={index} hemistich1={data.hemistich1} hemistich2={data.hemistich2} poet={data.poet} />
      ))}
      {poem.index < check.length ? <button onClick={clickHandler}>More!</button> : undefined}
    </div>
  );
};

export default App;

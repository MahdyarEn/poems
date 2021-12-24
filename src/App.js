import React, { useState, useEffect, useRef, useMemo } from "react";
import Header from "./components/Header";
import Select from "react-select";
import Poem from "./components/Poem";
// api
import { getPoems } from "./services/poems";

const App = () => {
  const [data, setData] = useState([]);
  let listAllowed = useRef([]);
  let listAllowed1 = useRef([]);
  let listAllowed2 = useRef([]);

  useEffect(() => {
    const fetchApi = async () => {
      const poems = await getPoems();
      setData(poems);
    };
    fetchApi();
  }, []);
  const [poem, setPoem] = useState({
    end: false,
    index: 10,
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [pt, setpt] = useState(null);
  selectedOption?.map((item) => {
    listAllowed.current = [];
    listAllowed.current.push(item.value);
  });
  useEffect(() => {
    setPoem({ index: 10 });
  }, [selectedOption]);
  selectedOption1?.map((item) => {
    listAllowed1.current = [];
    listAllowed1.current.push(item.value);
  });
  pt?.map((item) => {
    listAllowed2.current = [];
    listAllowed2.current.push(item.value);
  });

  const [input, setInput] = useState("");
  const check = data.filter((item) => {
    if (listAllowed.current.some((v) => item.firstLetter.includes(v)) && listAllowed1.current.some((v) => item.lastLetter.includes(v)) && listAllowed2.current.some((v) => item.poet.includes(v)) && (item.hemistich1.includes(input) || item.hemistich2.includes(input))) {
      return true;
    }
    return false;
  });

  const dch = () => {
    const arr = [...check];
    console.log(arr, poem.index, "arr");
    return arr.splice(0, poem.index);
  };

  const clickHandler = () => {
    setPoem({ ...poem, index: (poem.index += 10) });
  };

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

  const changeHandler = (event) => {
    setInput(event.target.value);
  };
  console.log(selectedOption);
  return (
    <div className="container">
      <Header />
      <div className="select-container">
        <Select placeholder={"حرف اول ..."} className="select-options" classNamePrefix="select" onChange={setSelectedOption} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="first-letter" options={options} />
        <Select placeholder={"حرف آخر ..."} className="select-options" classNamePrefix="select" onChange={setSelectedOption1} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="first-last" options={options} />
        <Select placeholder={"شاعر ..."} className="select-options" classNamePrefix="select" onChange={setpt} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="poet" options={poetOptions} />
      </div>
      <input type="text" placeholder="جستجو در متن شعر ..." className="input shadow" onChange={changeHandler}></input>
      {dch()?.map((data) => (
        <Poem hemistich1={data.hemistich1} hemistich2={data.hemistich2} poet={data.poet} />
      ))}
      {poem.index < check.length ? <button onClick={clickHandler}>More!</button> : undefined}
      it's ok!
    </div>
  );
};

export default App;

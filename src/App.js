import React, { useState, useEffect, useRef, useMemo } from "react";

import Select from "react-select";

// api
import { getPoems } from "./services/poems";

const App = () => {
  const [data, setData] = useState([]);
  let listAllowed = useRef([]);
  let listAllowed1 = useRef([]);
  const [btn, setBtn] = useState(true)

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

  const check = data.filter((item) => {
    if (listAllowed.current.some((v) => item.firstLetter.includes(v)) && listAllowed1.current.some((v) => item.lastLetter.includes(v))) {
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
    { value: "هوشنگ ابتهاج", label: "الف" },
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

  console.log(selectedOption);
  return (
    <div>
      <Select className="basic-single" classNamePrefix="select" onChange={setSelectedOption} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={false} isSearchable={true} name="color" options={options} />
      <Select className="basic-single" classNamePrefix="select" onChange={setSelectedOption1} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={false} isSearchable={true} name="color2" options={options} />
      <Select className="basic-single" classNamePrefix="select" onChange={setSelectedOption1} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={false} isSearchable={true} name="color2" options={options} />
      {dch()?.map((data) => (
        <p>{data.hemistich1}</p>
      ))}
      {poem.index < check.length ? <button onClick={clickHandler}>More!</button> : undefined}
      it's ok!
    </div>
  );
};

export default App;

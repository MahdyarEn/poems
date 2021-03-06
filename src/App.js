import React, { useState, useEffect, useRef, useMemo } from "react";

// import Components
import Header from "./components/Header";
import Select from "react-select";
import Poem from "./components/Poem";
import Message from "./components/Message";
// Api
import { getPoems } from "./services/poems";
import { getGithubInfo } from "./services/github";

const App = () => {
  // States
  const [data, setData] = useState([]);
  const [gitHub, setgSitHub] = useState({});
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
      const git = await getGithubInfo();
      setgSitHub(git);
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
    { value: "", label: "??????" },
    { value: "??", label: "??????" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
    { value: "??", label: "??" },
  ];

  // Allowed Options for Poet

  const poetOptions = [
    { value: "", label: "??????" },
    { value: "????????", label: "????????" },
    { value: "????????", label: "????????" },
    { value: "??????????", label: "??????????" },
    { value: "????????????", label: "????????????" },
    { value: "??????????", label: "??????????" },
    { value: "????????", label: "????????" },
    { value: "????????", label: "????????" },
    { value: "???????? ??????????", label: "???????? ??????????" },
    { value: "?????????? ??????????????", label: "?????????? ??????????????" },
    { value: "?????????? ????????????", label: "?????????? ????????????" },
    { value: "???????????????? ??????????", label: "???????????????? ??????????" },
    { value: "????????", label: "????????" },
    { value: "????????????", label: "????????????" },
    { value: "????????????", label: "????????????" },
    { value: "??????????", label: "??????????" },
    { value: "?????? ??????????", label: "?????? ??????????" },
    { value: "???????? ????????", label: "???????? ????????" },
    { value: "??????????", label: "??????????" },
    { value: "???????????? ??????????", label: "???????????? ??????????" },
    { value: "???????? ?????????????????", label: "???????? ?????????????????" },
    { value: "??????????????????????? ????????", label: "??????????????????????? ????????" },
    { value: "???????? ??????????", label: "???????? ??????????" },
  ];

  // Search Hnadler
  const changeHandler = (event) => {
    setInput(event.target.value);
  };
  return (
    <div className="container">
      <Header />
      <div className="select-container">
        <Select placeholder={"?????? ?????? ..."} className="select-options" classNamePrefix="select" onChange={setFirstLetterOptions} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="first-letter" options={options} />
        <Select placeholder={"?????? ?????? ..."} className="select-options" classNamePrefix="select" onChange={setLastLetterOptions} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="first-last" options={options} />
        <Select placeholder={"???????? ..."} className="select-options" classNamePrefix="select" onChange={setpt} isMulti isDisabled={false} isLoading={false} isClearable={true} isRtl={true} isSearchable={true} name="poet" options={poetOptions} />
      </div>
      <input type="text" placeholder="?????????? ???? ?????? ?????? ..." className="input shadow" onChange={changeHandler}></input>
      {limitCheck().length === 0 && poetAllowed.current.length > 0 && lastLetterAllowed.current.length > 0 && firstLetterAllowed.current.length > 0 ? (
        <Message text="???????????????? ????????  ???????? ??????." />
      ) : (
        limitCheck()?.map((data, index) => <Poem key={index} hemistich1={data.hemistich1} hemistich2={data.hemistich2} poet={data.poet} />)
      )}
      {poem.index < check.length ? (
        <button className="btnMore" onClick={clickHandler}>
          ?????????? ??????????
        </button>
      ) : undefined}
      {Object.keys(gitHub).length > 0 ? (
        <a className="star" target="_blank" href={gitHub.html_url}>
          <span>?????????? : </span>
          <b>{gitHub.stargazers_count}</b>
        </a>
      ) : (
        undefined
      )}
    </div>
  );
};

export default App;

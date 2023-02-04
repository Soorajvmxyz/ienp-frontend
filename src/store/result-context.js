import { useState } from "react";
import { createContext } from "react";
import axios from "../components/api/axios";

const ResultContext = createContext({
  results: [],
  resultLenght: 0,
  getReservationPublic: (subject, month, year) => {},
});

export function ResultContextProvider(props) {
  const [currentResults, setCurrentResults] = useState([]);

  async function getReservationPublicHandler(subject, month, year) {
    await axios
      .get(`/api/v1/results/subject/${subject}/${month}/${year}`)
      .then((res) => {
        setCurrentResults(res.data);
      });
  }

  const context = {
    results: currentResults,
    resultLenght: currentResults.length,
    getReservationPublic: getReservationPublicHandler,
  };

  return (
    <ResultContext.Provider value={context}>
      {props.children}
    </ResultContext.Provider>
  );
}

export default ResultContext;

import { useState, createContext } from "react";
import axios from "../components/api/axios";

const ResultContext = createContext({
  results: [],
  resultLenght: 0,
  searchData: {},
  students: [],
  getResultFaculty: (department, academicYear, subject, month, year) => {},
  getResultPublic: (rollNo, month, year) => {},
  addResult: (data) => {},
});

export function ResultContextProvider(props) {
  const [currentResults, setCurrentResults] = useState([]);
  const [searchDataFaculty, setSearchDataFaculty] = useState({});
  const [currentStudents, setCurrentStudents] = useState([]);

  async function getResultFacultyHandler(
    department,
    academicYear,
    subject,
    month,
    year
  ) {
    await axios
      .get(`/api/v1/student/year/${department}/${academicYear}`)
      .then(async (res) => {
        setCurrentStudents(await res.data);
      });

    await axios
      .get(`/api/v1/results/subject/${subject}/${month}/${year}`)
      .then(async (res) => {
        setCurrentResults(await res.data);
        setSearchDataFaculty({
          subject: subject,
          month: month,
          year: year,
          academicYear: academicYear,
        });
      });
  }
  async function getResultPublicHandler(rollNo, month, year) {
    await axios
      .get(`/api/v1/results/rollno/${rollNo}/${month}/${year}`)
      .then((res) => {
        setCurrentResults(res.data);
      });
  }

  async function addResultHandler(data) {
    console.log(data);
  }

  const context = {
    results: currentResults,
    resultLenght: currentResults.length,
    searchData: searchDataFaculty,
    students: currentStudents,
    getResultFaculty: getResultFacultyHandler,
    getResultPublic: getResultPublicHandler,
    addResult: addResultHandler,
  };

  return (
    <ResultContext.Provider value={context}>
      {props.children}
    </ResultContext.Provider>
  );
}

export default ResultContext;

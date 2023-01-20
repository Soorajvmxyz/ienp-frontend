import AuthNavigation from "../components/Layout/AuthNavigation";
import GetResults from "../components/results/GetResults";

export default function Results() {
  return (
    <>
      <AuthNavigation page="results" />
      <div className="d-flex flex-column align-items-center p-2">
        <GetResults />
        <button className="btn btn-outline-dark mt-3">find results</button>
      </div>
    </>
  );
}

export default function GetResults() {
  return (
    <div className="card w-25 mt-3 p-3">
      <label htmlFor="rollno">RollNo</label>
      <input type="text" id="rollno" className="form-control mt-3" />
      <label htmlFor="rollno">Department</label>
      <input type="text" className="form-control mt-3" />
      <label htmlFor="rollno">Month Of Exam</label>
      <input type="text" className="form-control mt-3 mb-3" />
    </div>
  );
}

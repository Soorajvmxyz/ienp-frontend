import StudentRow from "./StudentRow";

export default function StudnetTable(props) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Enrollment No</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.students.map((student) => (
          <StudentRow
            key={student.rollNo}
            rollNo={student.rollNo}
            name={student.name}
            onChange={props.onChange}
          />
        ))}
      </tbody>
    </table>
  );
}

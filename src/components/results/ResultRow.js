export default function ResultRow({ result }) {
  return (
    <>
      <td>{result.rollNo}</td>
      <td>{result.mark}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </>
  );
}

import MainNavigation from "../components/Layout/MainNavigation";
import StudentBody from "../components/students/StudentBody";

export default function Students() {
  return (
    <>
      <MainNavigation page="students" />
      <div className="d-flex flex-column align-items-center p-2">
        <StudentBody />
      </div>
    </>
  );
}

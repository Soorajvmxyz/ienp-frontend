import { useEffect, useState } from "react";
import AnnouncementBody from "../components/announcements/AnnouncementBody";
import MainNavigation from "../components/Layout/MainNavigation";
import axios from "../components/api/axios";
import { Link } from "react-router-dom";

export default function FacultyHome() {
  const [announcementData, setAnnouncementData] = useState([]);
  const user = JSON.parse(localStorage.getItem("login")).username;

  async function getAnnouncements() {
    await axios.get(`/api/v1/announcement/${user}`).then(async (res) => {
      setAnnouncementData(await res.data);
    });
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <>
      <MainNavigation page="home" />
      <div className="d-flex flex-column align-items-center p-2">
        <Link
          to="add-announcement"
          className="btn fw-bold fs-4 mt-2 text-dark shadow-sm"
        >
          New Announcement
        </Link>
        <div className="d-flex flex-column align-items-center p-2 w-50">
          {announcementData.length !== 0 ? (
            <AnnouncementBody
              announcements={announcementData}
              access="faculty"
            />
          ) : (
            <h5>You have no announcements yet</h5>
          )}
        </div>
      </div>
    </>
  );
}

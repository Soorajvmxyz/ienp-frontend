import { useEffect, useState } from "react";
import AnnouncementBody from "../components/announcements/AnnouncementBody";
import MainNavigation from "../components/Layout/MainNavigation";
import axios from "../components/api/axios";

export default function FacultyHome() {
  const [announcementData, setAnnouncementData] = useState([]);

  async function getAnnouncements() {
    await axios.get("/api/v1/announcement").then((res) => {
      setAnnouncementData(res.data);
    });
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <>
      <MainNavigation page="home" />
      <div className="d-flex flex-column align-items-center p-2">
        <button className="btn fw-bold fs-4 mt-2">New Announcement</button>
        <div className="d-flex flex-column align-items-center p-2 w-50">
          <AnnouncementBody announcements={announcementData} access="faculty" />
        </div>
      </div>
    </>
  );
}

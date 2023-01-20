import { useEffect, useState } from "react";
import AnnouncementBody from "../components/announcements/AnnouncementBody";
import AuthNavigation from "../components/Layout/AuthNavigation";
import axios from "../components/api/axios";

export default function Home() {
  const [announcementData, setAnnouncementData] = useState([]);
  const [mounted, setMounted] = useState(false);

  async function getAnnouncements() {
    await axios.get("/api/v1/announcement").then((res) => {
      setAnnouncementData(res.data);
      setMounted(true);
    });
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <>
      <AuthNavigation page={"home"} />
      {mounted ? (
        <div className="d-flex flex-column align-items-center p-2 ">
          <AnnouncementBody announcements={announcementData} access="user" />
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

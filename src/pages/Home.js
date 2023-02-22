import { useEffect, useState } from "react";
import AnnouncementBody from "../components/announcements/AnnouncementBody";
import AuthNavigation from "../components/Layout/AuthNavigation";
import axios from "../components/api/axios";
import NewsLetter from "../components/newsletter/NewsLetter";

export default function Home() {
  const [announcementData, setAnnouncementData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [newsLetterToggle, setNewsLetterToggle] = useState(false);

  async function getAnnouncements() {
    await axios.get("/api/v1/announcement").then((res) => {
      setAnnouncementData(res.data);
      setMounted(true);
    });
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  function toggleNewsletter() {
    setNewsLetterToggle(!newsLetterToggle);
  }

  return (
    <>
      <AuthNavigation page={"home"} />
      <div className="d-flex flex-column w-25 p-3">
        {newsLetterToggle ? (
          <NewsLetter onNewsLetter={toggleNewsletter} />
        ) : (
          <button
            className="btn border btn-primary w-100"
            onClick={toggleNewsletter}
          >
            Sign up for Notifications
          </button>
        )}
      </div>
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

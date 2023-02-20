import { useEffect } from "react";
import NewAnnouncementBody from "../components/announcements/NewAnnouncementBody";
import MainNavigation from "../components/Layout/MainNavigation";
import axios from "../components/api/axios";

export default function NewAnnouncement() {
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      JSON.parse(localStorage.getItem("login")).token
    }`;
  });
  return (
    <>
      <MainNavigation />;
      <div className="d-flex flex-column align-items-center p-2">
        <NewAnnouncementBody />
      </div>
    </>
  );
}

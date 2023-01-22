import NewAnnouncementBody from "../components/announcements/NewAnnouncementBody";
import MainNavigation from "../components/Layout/MainNavigation";

export default function NewAnnouncement() {
  return (
    <>
      <MainNavigation />;
      <div className="d-flex flex-column align-items-center p-2">
        <NewAnnouncementBody />
      </div>
    </>
  );
}

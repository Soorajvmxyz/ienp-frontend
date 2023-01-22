import AnnouncementRow from "./AnnouncementRow";

const AnnouncementBody = (props) => {
  return (
    <>
      {props.announcements.map((announcement) => (
        <AnnouncementRow
          key={announcement.id}
          id={announcement.id}
          title={announcement.title}
          subject={announcement.subject}
          description={announcement.description}
          date={announcement.date}
          access={props.access}
        />
      ))}
    </>
  );
};

export default AnnouncementBody;

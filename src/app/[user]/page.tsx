import { ProfileClientPage } from "./client";

const Profile = () => {
  return <ProfileClientPage />;
};

export default Profile;

// TODO: get name and username of the user from the database and use it to set the title of the page
export const metadata = {
  title: "Profile",
};

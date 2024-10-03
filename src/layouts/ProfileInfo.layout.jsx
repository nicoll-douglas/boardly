import { Outlet } from "react-router-dom";
import { Profile, ProfileProvider, useIsMe } from "../features/user-profile";

export default function ProfileInfoLayout() {
  const [isMe, username] = useIsMe();

  return (
    <ProfileProvider user={{ isMe, username }}>
      <Profile>
        <Outlet />
      </Profile>
    </ProfileProvider>
  );
}

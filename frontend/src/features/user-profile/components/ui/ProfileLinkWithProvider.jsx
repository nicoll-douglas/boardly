import ProfileLink from "./ProfileLink";
import { ProfileProvider } from "../../contexts/ProfileContext";

export default function ProfileLinkWithProvider(props) {
  return (
    <ProfileProvider user={{ isMe: true }}>
      <ProfileLink {...props} />
    </ProfileProvider>
  );
}

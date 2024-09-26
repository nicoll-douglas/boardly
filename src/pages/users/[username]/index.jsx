import { ProfileProvider, Profile, useIsMe } from "@/features/user-profile";

export default function User() {
  const [isMe, username] = useIsMe();

  return (
    <ProfileProvider user={{ isMe, username }}>
      <Profile />
    </ProfileProvider>
  );
}

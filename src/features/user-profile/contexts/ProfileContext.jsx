import useProtectedQuery from "@/lib/hooks/useProtectedQuery";
import data from "@root/cypress/fixtures/features/user-profile/200-response.json";
import { createContext } from "react";
import dompurify from "dompurify";

const ProfileContext = createContext(null);

function ProfileProvider({ children }) {
  const { isLoading, protectedData } = useProtectedQuery(
    "/api/me",
    false,
    data.body
  );

  const username = protectedData?.profile.username;
  const age = protectedData?.profile.age;
  const pronouns = protectedData?.profile.pronouns;
  const bio = protectedData?.profile.bio;
  const avatar = protectedData?.profile.avatar;
  const tags = [];
  if (age) tags.push(age);
  if (pronouns) tags.push(pronouns);
  const profile = {
    username,
    age,
    pronouns,
    bio: dompurify.sanitize(bio),
    avatar,
    tags,
  };

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileProvider };

export default function destructureData(data) {
  const username = data?.profile.username;
  const age = data?.profile.age;
  const pronouns = data?.profile.pronouns;
  const bio = data?.profile.bio;
  const profileTags = [];
  if (age) profileTags.push(age);
  if (pronouns) profileTags.push(pronouns);
  return { username, bio, profileTags };
}

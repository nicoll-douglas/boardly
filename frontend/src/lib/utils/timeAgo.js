import formatISOString from "./formatISOString";

export default function timeAgo(ISOString) {
  if (!ISOString) return;
  const now = new Date();
  const dateObj = new Date(ISOString);

  const secondsAgo = Math.floor((now - dateObj) / 1000);
  if (secondsAgo < 60) {
    return `${secondsAgo}sec. ago`;
  }

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo}min. ago`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo}hr. ago`;
  }

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo <= 7) {
    return `${daysAgo}d. ago`;
  }

  return formatISOString(ISOString);
}

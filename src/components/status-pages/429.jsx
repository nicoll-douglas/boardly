import StatusPage from "./StatusPage";
import explosionUrl from "@/assets/images/explosion.svg";

export default function TooMany() {
  return (
    <StatusPage
      title="Too Many Requests"
      message="Slow down!"
      imageUrl={explosionUrl}
      textWidth="350px"
    />
  );
}

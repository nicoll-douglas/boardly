import OffPage from "@/components/common/OffPage";
import explosionUrl from "@/assets/explosion.svg";

export default function TooMany() {
  return (
    <OffPage
      title="Too Many Requests"
      message="Slow down!"
      imageUrl={explosionUrl}
      textWidth="350px"
    />
  );
}

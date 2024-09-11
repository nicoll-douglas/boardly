import notFoundUrl from "@/assets/not-found.svg";
import StatusPage from "./StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      title="Not Found"
      message="The page you're looking for could not be found."
      imageUrl={notFoundUrl}
    />
  );
}

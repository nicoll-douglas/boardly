import StatusPage from "./StatusPage";
import constructionUrl from "@/assets/images/construction.svg";

export default function ServerError() {
  return (
    <StatusPage
      title="Server Error"
      message="Something went wrong, please refresh the page to try again. If the problem persists, please try again later."
      imageUrl={constructionUrl}
    />
  );
}

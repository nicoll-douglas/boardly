import OffPage from "@/components/common/OffPage";
import constructionUrl from "@/assets/construction.svg";

export default function ServerError() {
  return (
    <OffPage
      title="Server Error"
      message="Something went wrong, please refresh the page to try again. If the problem persists, please try again later."
      imageUrl={constructionUrl}
    />
  );
}

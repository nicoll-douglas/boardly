import notFoundUrl from "@/assets/not-found.svg";
import OffPage from "@/components/common/OffPage";

export default function NotFound() {
  return (
    <OffPage
      title="Not Found"
      message="The page you're looking for could not be found."
      imageUrl={notFoundUrl}
    />
  );
}

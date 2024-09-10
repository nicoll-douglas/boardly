import authUrl from "@/assets/auth.svg";
import OffPage from "@/components/common/OffPage";

export default function Unauthorized() {
  return (
    <OffPage
      title="Unauthorized"
      message="Please login to continue or access the requested resource."
      imageUrl={authUrl}
      textWidth="480px"
    />
  );
}

import authUrl from "@/assets/auth.svg";
import StatusPage from "./StatusPage";

export default function Unauthorized() {
  return (
    <StatusPage
      title="Unauthorized"
      message="Please login to continue or access the requested resource."
      imageUrl={authUrl}
      textWidth="480px"
      link="/auth/login"
      linkText="Login"
    />
  );
}

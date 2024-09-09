import FormModal from "@/components/common/FormModal";
import NewPwdForm from "@/features/auth/components/NewPwdForm";
import { useSearchParams } from "react-router-dom";

export default function Reset() {
  const [searchParams] = useSearchParams();

  return (
    <FormModal isOpen={true} motionPreset="none" heading="Your New Password">
      <NewPwdForm token={searchParams.get("token")} />
    </FormModal>
  );
}

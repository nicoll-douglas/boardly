import FormModal from "@/components/common/FormModal";
import NewPwdForm from "@/features/auth/passwordReset/components/NewPwdForm";
import { useParams } from "react-router-dom";

export default function NewPwdPage() {
  const { token } = useParams();

  return (
    <FormModal isOpen={true} motionPreset="none" heading="Your New Password">
      <NewPwdForm token={token} />
    </FormModal>
  );
}

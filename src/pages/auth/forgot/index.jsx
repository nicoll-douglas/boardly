import FormModal from "@/components/common/FormModal";
import ForgotPwdForm from "@/features/auth/components/ForgotPwdForm";
import Optimistic from "@/components/utility/Optimistic";

export default function Forgot() {
  return (
    <Optimistic>
      <FormModal isOpen={true} heading="Forgot Password" motionPreset={"none"}>
        <ForgotPwdForm />
      </FormModal>
    </Optimistic>
  );
}

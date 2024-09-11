import { FormModal } from "@/components/common";
import { NewPwdForm } from "@/features/auth";
import { useSearchParams } from "react-router-dom";
import { Optimistic } from "@/components/utility";

export default function Reset() {
  const [searchParams] = useSearchParams();

  return (
    <Optimistic>
      <FormModal isOpen={true} motionPreset="none" heading="Your New Password">
        <NewPwdForm token={searchParams.get("token")} />
      </FormModal>
    </Optimistic>
  );
}

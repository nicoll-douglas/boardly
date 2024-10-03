import { useSearchParams } from "react-router-dom";
import { Container, Header, Logo } from "@/components/common";
import { Verification } from "@/features/auth";

export default function Verify() {
  const [searchParams] = useSearchParams();

  return (
    <Container>
      <Header>
        <Logo to="/" />
      </Header>
      <Verification token={searchParams.get("token")} />
    </Container>
  );
}

import { useSearchParams } from "react-router-dom";
import { Container, Header, Logo } from "@/components/common";
import { Verification, Optimistic } from "@/features/auth";

export default function Verify() {
  const [searchParams] = useSearchParams();

  return (
    <Optimistic>
      <Container>
        <Header>
          <Logo to="/" />
        </Header>
        <Verification token={searchParams.get("token")} />
      </Container>
    </Optimistic>
  );
}

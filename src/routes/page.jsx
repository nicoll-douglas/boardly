import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Header from "@/components/common/Header";
import LoginBtn from "@/features/auth/login/components/LoginBtn";

export default function IndexPage() {
  return (
    <Container>
      <Header>
        <Logo to="/" />
        <LoginBtn ml="auto" />
      </Header>
    </Container>
  );
}

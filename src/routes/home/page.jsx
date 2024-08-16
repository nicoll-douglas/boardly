import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import Logo from "@/components/common/Logo";

export default function HomePage() {
  return (
    <Container>
      <Header>
        <Logo to="/home" />
      </Header>
    </Container>
  );
}

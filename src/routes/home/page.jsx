import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import Logo from "@/components/common/Logo";

export default function HomePage() {
  return (
    <Container maxW={"8xl"}>
      <Header>
        <Logo to="/home" />
      </Header>
    </Container>
  );
}

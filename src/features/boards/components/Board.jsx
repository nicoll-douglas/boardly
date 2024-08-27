import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import Logo from "@/components/common/Logo";
import Grid from "@/components/common/Grid";
import { GridItem } from "@chakra-ui/react";
import Sidebar from "@/features/boards/components/Sidebar";
import ProfileLink from "@/features/user-profile/components/ui/ProfileLink";
import BoardDetailsCard from "@/features/boards/components/BoardDetailsCard";
import ButtonsCard from "@/features/boards/components/ButtonsCard";

export default function board({ children }) {
  return (
    <Container maxW={"8xl"}>
      <Header>
        <Logo to="/boards/main" />
        <ProfileLink />
      </Header>
      <Grid>
        <GridItem
          colStart={{ base: 1, md: 3, lg: 1 }}
          colEnd={{ base: 13, md: 11, lg: 4, xl: 4 }}
          display={{ base: "none", lg: "inline" }}
          position={"sticky"}
          maxH={"calc(100dvh - 88px)"}
          top={"72px"}
        >
          <Sidebar />
        </GridItem>
        <GridItem
          colStart={{ base: 1, lg: 4 }}
          colEnd={{ base: 13, md: 8, lg: 10 }}
          minH={"calc(100dvh - 88px)"}
        >
          {children}
        </GridItem>
        <GridItem
          colStart={{ base: 1, md: 8, lg: 10 }}
          colEnd={13}
          h={"fit-content"}
          position={{ base: "static", md: "sticky" }}
          top={"72px"}
          maxH={{ base: 72, md: "calc(100dvh - 88px)" }}
          rowStart={1}
        >
          <BoardDetailsCard />
          <ButtonsCard />
        </GridItem>
      </Grid>
    </Container>
  );
}

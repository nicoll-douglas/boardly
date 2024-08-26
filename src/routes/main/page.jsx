import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import Logo from "@/components/common/Logo";
import Grid from "@/components/common/Grid";
import { GridItem } from "@chakra-ui/react";
import Sidebar from "@/features/boards/components/Sidebar";
import ProfileLink from "@/components/common/ProfileLink";
import { ProfileProvider } from "@/features/user-profile/contexts/ProfileContext";
import BoardDetailsCard from "@/features/boards/components/BoardDetailsCard";
import { MainBoardProvider } from "@/features/boards/contexts/MainBoardContext";
import ButtonsCard from "@/features/boards/components/ButtonsCard";
import ThreadsList from "@/features/boards/components/ThreadsList";

export default function HomePage() {
  return (
    <ProfileProvider>
      <MainBoardProvider>
        <Container maxW={"8xl"}>
          <Header>
            <Logo to="/main" />
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
              <ThreadsList />
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
      </MainBoardProvider>
    </ProfileProvider>
  );
}

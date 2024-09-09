import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import Logo from "@/components/common/Logo";
import { GridItem } from "@chakra-ui/react";
import ProfileCard from "@/features/user-profile/components/ui/ProfileCard";
import Grid from "@/components/common/Grid";

export default function ProfilePage() {
  return (
    <Container maxW={"8xl"}>
      <Header>
        <Logo to="/boards/main" />
      </Header>
      <Grid>
        <GridItem
          colStart={{ base: 1, md: 3, lg: 1 }}
          colEnd={{ base: 13, md: 11, lg: 6, xl: 5 }}
          rowStart={1}
          h="fit-content"
          position={"sticky"}
          top={"72px"}
        >
          <ProfileCard />
        </GridItem>
      </Grid>
    </Container>
  );
}

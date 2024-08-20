import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import Logo from "@/components/common/Logo";
import { Grid, GridItem } from "@chakra-ui/react";
import ProfileCard from "@/features/user-profile/components/ProfileCard";
import { ProfileProvider } from "@/features/user-profile/contexts/ProfileContext";

export default function ProfilePage() {
  return (
    <ProfileProvider>
      <Container maxW={"8xl"}>
        <Header>
          <Logo to="/home" />
        </Header>
        <Grid
          flex={1}
          templateColumns={"repeat(12, 1fr)"}
          templateRows={"repeat(12, 1fr)"}
          gap={4}
          py={4}
        >
          <GridItem
            colStart={{ base: 1, md: 3, lg: 1 }}
            colEnd={{ base: 13, md: 11, lg: 6, xl: 5 }}
            rowStart={1}
            rowEnd={5}
          >
            <ProfileCard />
          </GridItem>
        </Grid>
      </Container>
    </ProfileProvider>
  );
}

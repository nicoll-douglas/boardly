import { ProfileProvider } from "@/features/user-profile/contexts/ProfileContext";
import { MainBoardProvider } from "@/features/boards/contexts/MainBoardContext";
import ThreadsList from "@/features/boards/components/ThreadsList";
import Board from "@/features/boards/components/Board";

export default function HomePage() {
  return (
    <ProfileProvider>
      <MainBoardProvider>
        <Board>
          <ThreadsList />
        </Board>
      </MainBoardProvider>
    </ProfileProvider>
  );
}

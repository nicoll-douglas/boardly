import { ProfileProvider } from "@/features/user-profile/contexts/ProfileContext";
import { BoardProvider } from "@/features/boards/contexts/BoardContext";
import Board from "@/features/boards/components/Board";

export default function ThreadsPage() {
  <ProfileProvider>
    <BoardProvider>
      <Board></Board>
    </BoardProvider>
  </ProfileProvider>;
}

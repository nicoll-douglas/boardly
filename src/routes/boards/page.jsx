import { ProfileProvider } from "@/features/user-profile/contexts/ProfileContext";
import { BoardProvider } from "@/features/boards/contexts/BoardContext";
import ThreadsList from "@/features/boards/components/ThreadsList";
import Board from "@/features/boards/components/Board";
import { useParams } from "react-router-dom";

export default function BoardPage() {
  const { boardName } = useParams();

  return (
    <ProfileProvider>
      <BoardProvider boardName={boardName}>
        <Board>
          <ThreadsList />
        </Board>
      </BoardProvider>
    </ProfileProvider>
  );
}

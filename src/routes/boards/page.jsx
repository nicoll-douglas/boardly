import { ProfileProvider } from "@/features/user-profile/contexts/ProfileContext";
import { BoardProvider } from "@/features/boards/contexts/BoardContext";
import ThreadsList from "@/features/boards/components/ThreadsList";
import Board from "@/features/boards/components/Board";
import { useParams } from "react-router-dom";

export default function BoardPage() {
  const { boardID } = useParams();

  return (
    <ProfileProvider>
      <BoardProvider boardID={boardID}>
        <Board>
          <ThreadsList />
        </Board>
      </BoardProvider>
    </ProfileProvider>
  );
}

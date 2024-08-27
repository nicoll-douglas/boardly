import { ProfileProvider } from "@/features/user-profile/contexts/ProfileContext";
import { BoardProvider } from "@/features/boards/contexts/BoardContext";
import Board from "@/features/boards/components/Board";
import { useParams } from "react-router-dom";

export default function ThreadsPage() {
  const { boardName } = useParams();

  return (
    <ProfileProvider>
      <BoardProvider boardName={boardName}>
        <Board></Board>
      </BoardProvider>
    </ProfileProvider>
  );
}

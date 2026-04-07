import { useContext } from "react";
import { SessionContext } from "../SessionProvider";

export function PostedSearch() {
  const { currentUser } = useContext(SessionContext);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">投稿の検索</h2>
    </div>
  );
}

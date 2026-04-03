import { useContext } from "react";
import { SessionContext } from "../SessionProvider";

export function Post(props) {
  const { currentUser } = useContext(SessionContext);

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">by {props.post.userName}</h3>
      <p className="text-gray-700">{props.post.content}</p>

      {currentUser.id === props.post.userId && (
        <button
          onClick={() => props.onDelete(props.post.id)} //削除したいpost.idを渡し、削除ボタンを押したら削除される
          className="text-blue-500 hover:underline cursor-pointer focus:outline-none"
        >
          削除
        </button> //ログイン中のユーザーidと投稿したuserIdが同じなら、削除ボタンを表示
      )}
    </div>
  );
}

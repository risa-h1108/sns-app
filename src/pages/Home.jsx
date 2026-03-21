import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../SessionProvider";
import { SideMenu } from "../components/SideMenu";
import { postRepository } from "../repositories/post";

function Home() {
  const [content, setContent] = useState("");
  const { currentUser } = useContext(SessionContext);

  const createPost = async () => {
    const post = await postRepository.create(content, currentUser.id);
    console.log(post);
    setContent(""); //投稿後はリセットするため、空白値にする
  };

  //currentUserがない（null）ならば、signinへ（ログインするよう）遷移する
  if (currentUser == null) return <Navigate replace to="/signin" />;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#34D399] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">SNS APP</h1>
          <button className="text-white hover:text-red-600">ログアウト</button>
        </div>
      </header>
      <div className="container mx-auto mt-6 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <textarea
                className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                placeholder="What's on your mind?"
                onChange={(e) => setContent(e.target.value)}
                value={content} //contentのデータはonChangeのsetContentに渡され、ブラウザ上ではcontentは空になる（＝投稿後の文章リセット機能）
              />
              <button
                className="bg-[#34D399] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={createPost}
                disabled={content === ""} //空白での投稿は無効
              >
                Post
              </button>
            </div>
            <div className="mt-4"></div>
          </div>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default Home;

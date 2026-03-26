import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../SessionProvider";
import { SideMenu } from "../components/SideMenu";
import { postRepository } from "../repositories/post";
import { Post } from "../components/Post";
import { Pagination } from "../components/Pagination";

const limit = 5;

function Home() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { currentUser } = useContext(SessionContext);

  //ページが表示した時にfetchPostsで定義したsupabase内のpostを取得する
  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    const post = await postRepository.create(content, currentUser.id);
    //投稿データをsetPostsに渡すと、リアルタイムで投稿データが反映される
    setPosts([
      //userId,userNameの情報を含めた「今作成した投稿」のこと、先頭に表示
      { ...post, userId: currentUser.id, userName: currentUser.userName },
      ...posts, //以前から表示済みの投稿のこと
    ]);
    setContent(""); //投稿後はリセットするため、空白値にする
  };

  //supabaseのpostsをStateに入れて、変動させる
  const fetchPosts = async (page) => {
    const posts = await postRepository.find(page, limit);
    setPosts(posts);
  };

  const moveToNext = async () => {
    const nextPage = page + 1;
    await fetchPosts(nextPage);
    setPage(nextPage);
  };

  const moveToPrev = async () => {
    const prevPage = page - 1;
    await fetchPosts(prevPage);
    setPage(prevPage);
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
            <div className="mt-4">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
            <Pagination onPrev={moveToPrev} onNext={moveToNext} />
          </div>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default Home;

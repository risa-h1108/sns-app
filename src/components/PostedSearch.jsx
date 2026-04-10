import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId } from "react";

export function PostedSearch(props) {
  const postId = useId();

  return (
    <section className="mb-10">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">投稿の検索</h2>

        <label htmlFor={postId}></label>
        <input
          type="text"
          id={postId}
          className="border-[#34D399] w-2/3 p-2 rounded-l-lg focus:border-green-500"
          placeholder="探したい投稿を入力してください"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </section>
  );
}

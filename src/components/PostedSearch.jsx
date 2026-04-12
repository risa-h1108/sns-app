import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId } from "react";

export function PostedSearch(props) {
  const postId = useId();

  return (
    <section className="mb-10">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">投稿の検索</h2>

        <div className="flex">
          <input
            onChange={props.onInputChange}
            type="text"
            id={postId}
            //枠線の色を表示させる時：border単体が必要、
            // 枠線を別色でfocusしたい時：ブラウザのデフォルトでアウトラインが乗らないように「focus:outline-none」の追加が必要
            className="border border-gray-200 w-2/3 p-2 rounded-l-lg focus:border-gray-400 focus:outline-none"
            placeholder="探したい投稿を入力してください"
          />
          <button
            onClick={props.onSubmit}
            className="bg-[#34D399] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r-lg"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </section>
  );
}

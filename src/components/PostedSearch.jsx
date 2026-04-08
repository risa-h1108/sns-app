// export function PostedSearch(props) {
//   return (
//     <section className="mb-10">
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">投稿の検索</h2>
//       </div>
//     </section>
//   );
// }

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PostedSearch(props) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">投稿の検索</h2>
      <input
        className="bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none"
        placeholder="探したい曲を入力してください"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}

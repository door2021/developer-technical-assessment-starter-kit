import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setQuery, runSearch, selectSearch } from "../features/search/searchSlice";

export default function Searchbar() {
  const dispatch = useAppDispatch();
  const { query, loading } = useAppSelector(selectSearch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      dispatch(runSearch(query));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white rounded-lg shadow-md p-2 max-w-xl"
    >
      <input
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        className="flex-1 px-4 py-2 text-gray-700 outline-none"
        placeholder="Search by city, property name..."
      />

      <button
        type="submit"
        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

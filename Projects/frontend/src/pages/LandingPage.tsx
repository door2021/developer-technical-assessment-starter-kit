import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import HeroSection from "../content/HeroSection";
import PropertyGrid from "../content/PropertyGrid";
import { fetchPopularListings, selectProperties } from "../features/properties/propertySlice";
import { selectSearch } from "../features/search/searchSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { popular, loading } = useAppSelector(selectProperties);
  const searchState = useAppSelector(selectSearch);

  useEffect(() => {
    dispatch(fetchPopularListings());
  }, [dispatch]);

  return (
    <div className="pt-20 px-6 max-w-7xl mx-auto">

      <HeroSection />

      {/* SEARCH RESULTS */}
      {searchState.query && (
        <PropertyGrid
          title={`Search Results for "${searchState.query}"`}
          properties={searchState.results}
        />
      )}

      {/* POPULAR LISTINGS */}
      {!searchState.query && popular && (
        <PropertyGrid
          title="Popular Properties"
          properties={popular.properties}
        />
      )}

      {loading && <p className="text-center mt-12">Loading...</p>}
    </div>
  );
}

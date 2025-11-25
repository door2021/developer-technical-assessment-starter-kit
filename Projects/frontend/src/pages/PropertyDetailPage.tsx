import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPropertyDetails, selectProperties } from "../features/properties/propertySlice";
import ImageCarousel from "../content/ImageCarousal";
import { selectAuth } from "../features/auth/authSlice";
import { agentApi } from "../api/agentApi";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { details, loading } = useAppSelector(selectProperties);
  const { user, token } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchPropertyDetails(Number(id)));
  }, [dispatch, id]);

  const handleContact = async () => {
    if (!user || !token) {
      alert("You must be logged in to contact an agent.");
      return;
    }

    await agentApi.contactAgent({
      user_id: user.id,
      property_id: Number(id),
      message: "I am interested in this property.",
    });

    alert("Your request has been sent to the agent!");
  };

  if (loading || !details) return <p className="pt-28 text-center">Loading...</p>;

  return (
    <div className="pt-28 max-w-7xl mx-auto px-6">
      <ImageCarousel images={details.image_urls} />

      <h1 className="text-4xl font-bold mt-6">{details.name}</h1>

      <p className="text-gray-600 mt-2">{details.location}</p>

      <p className="text-2xl font-bold text-primary mt-4">
        ${details.price.toLocaleString()}
      </p>

      <p className="mt-6 text-gray-700 leading-relaxed">{details.details}</p>

      <button
        onClick={handleContact}
        className="mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
      >
        Contact Agent
      </button>
    </div>
  );
}

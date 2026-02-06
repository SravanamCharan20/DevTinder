import { useEffect, useState } from "react";
import UserCard from "../components/UserCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { fetchFeed, sendConnectionRequest } from "../services/api.js";

const Feed = () => {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadFeed = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFeed({ page: pageNumber, limit: 10 });
      setProfiles(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed(page);
  }, [page]);

  const handleRequest = async (status, user) => {
    setActionLoading(true);
    try {
      await sendConnectionRequest({ status, toUserId: user._id });
      setProfiles((prev) => prev.filter((candidate) => candidate._id !== user._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section>
      <h1 className="page-title">Discover dev connections</h1>
      <p className="tagline">Swipe-less feed for pairing with your next co-founder, teammate, or mentor.</p>
      {loading ? (
        <LoadingSpinner label="Fetching feed" />
      ) : error ? (
        <div className="glass-panel" style={{ color: "#ff8a8a" }}>{error}</div>
      ) : profiles.length === 0 ? (
        <EmptyState
          title="No profiles left"
          message="You have seen everyone for now. Come back later or adjust filters."
        />
      ) : (
        <div className="card-grid">
          {profiles.map((profile) => (
            <UserCard
              key={profile._id}
              user={profile}
              onInterested={(user) => handleRequest("interested", user)}
              onIgnore={(user) => handleRequest("ignored", user)}
              disableActions={actionLoading}
            />
          ))}
        </div>
      )}
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}>
        <button className="secondary-btn" disabled={page === 1 || loading} onClick={() => setPage((prev) => prev - 1)}>
          Previous Page
        </button>
        <span style={{ alignSelf: "center", color: "#a0abc2" }}>Page {page}</span>
        <button className="secondary-btn" disabled={loading || profiles.length < 10} onClick={() => setPage((prev) => prev + 1)}>
          Next Page
        </button>
      </div>
    </section>
  );
};

export default Feed;

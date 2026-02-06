import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import EmptyState from "../components/EmptyState.jsx";
import UserCard from "../components/UserCard.jsx";
import { fetchConnections } from "../services/api.js";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConnections = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchConnections();
        setConnections(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadConnections();
  }, []);

  return (
    <section>
      <h1 className="page-title">Your matches</h1>
      <p className="tagline">People who accepted your request or whose request you accepted.</p>
      {loading ? (
        <LoadingSpinner label="Loading connections" />
      ) : error ? (
        <div className="glass-panel" style={{ color: "#ff8a8a" }}>{error}</div>
      ) : connections.length === 0 ? (
        <EmptyState title="No connections yet" message="Start exploring the feed and send some vibes." />
      ) : (
        <div className="card-grid">
          {connections.map((profile) => (
            <UserCard key={profile._id} user={profile} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Connections;

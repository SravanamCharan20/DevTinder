import { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { fetchReceivedRequests, reviewConnectionRequest } from "../services/api.js";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchReceivedRequests();
      setRequests(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleReview = async (status, request) => {
    setActionLoading(true);
    try {
      await reviewConnectionRequest({ status, requestId: request._id });
      setRequests((prev) => prev.filter((item) => item._id !== request._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section>
      <h1 className="page-title">Incoming requests</h1>
      <p className="tagline">Accept or reject developers who want to collaborate with you.</p>
      {loading ? (
        <LoadingSpinner label="Loading requests" />
      ) : error ? (
        <div className="glass-panel" style={{ color: "#ff8a8a" }}>{error}</div>
      ) : requests.length === 0 ? (
        <EmptyState title="No pending requests" message="You're all caught up!" />
      ) : (
        <div className="card-grid">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onAccept={(req) => handleReview("accepted", req)}
              onReject={(req) => handleReview("rejected", req)}
              disableActions={actionLoading}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Requests;

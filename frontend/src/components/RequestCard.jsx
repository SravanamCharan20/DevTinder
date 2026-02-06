const RequestCard = ({ request, onAccept, onReject, disableActions }) => {
  const { fromUserId } = request;

  return (
    <article className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3>
            {fromUserId.firstName} {fromUserId.lastName}
          </h3>
          <p style={{ margin: 0, color: "#a0abc2" }}>{fromUserId.gender || "Prefer not to say"}</p>
        </div>
        <span className="chip">Wants to connect</span>
      </div>
      <p style={{ margin: "8px 0", color: "#d5dbf0" }}>{fromUserId.about || "No bio provided"}</p>
      <div className="chip-row">
        {fromUserId.skills?.length ? (
          fromUserId.skills.map((skill) => (
            <span className="chip" key={skill}>
              {skill}
            </span>
          ))
        ) : (
          <span style={{ color: "#7f8aad" }}>No skills listed</span>
        )}
      </div>
      <div className="table-actions" style={{ marginTop: 12 }}>
        <button className="primary-btn" onClick={() => onAccept(request)} disabled={disableActions}>
          Accept
        </button>
        <button className="danger-btn" onClick={() => onReject(request)} disabled={disableActions}>
          Reject
        </button>
      </div>
    </article>
  );
};

export default RequestCard;

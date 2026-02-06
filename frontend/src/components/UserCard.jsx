const UserCard = ({ user, onInterested, onIgnore, disableActions }) => (
  <article className="card">
    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
      <div>
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <p style={{ margin: 0, color: "#a0abc2" }}>{user.gender}</p>
      </div>
      <div style={{ textAlign: "right", color: "#a0abc2" }}>
        Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}
      </div>
    </div>
    <p style={{ margin: "8px 0", color: "#d5dbf0" }}>{user.about}</p>
    {user.skills?.length ? (
      <div className="chip-row">
        {user.skills.map((skill) => (
          <span className="chip" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    ) : (
      <span style={{ color: "#9baeca" }}>No skills shared yet</span>
    )}
    {onInterested && (
      <div className="table-actions" style={{ marginTop: 12 }}>
        <button className="primary-btn" onClick={() => onInterested(user)} disabled={disableActions}>
          Interested
        </button>
        <button className="secondary-btn" onClick={() => onIgnore(user)} disabled={disableActions}>
          Ignore
        </button>
      </div>
    )}
  </article>
);

export default UserCard;

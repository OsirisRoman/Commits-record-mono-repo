const Commit = ({ commit }) => {
  const { url, shaId, daysAgo, commitMessage, author } = commit;
  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {shaId}
          </a>
        </h5>
        <small className="text-muted">{daysAgo} days ago</small>
      </div>
      <p className="mb-1">
        <b>Message: </b> {commitMessage}
      </p>
      <small className="text-muted">{author}</small>
    </div>
  );
};

export default Commit;

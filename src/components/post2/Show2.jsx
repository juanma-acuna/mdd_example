const Show2 = ({ post, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="row">
        <div key={post.id}>
          <div className="row-title">
            {post.id} - {post.title}
          </div>
          <div className="row-content">{post.body}</div>
          <div className="row-content">
            <b>Author:</b> {post.author}
          </div>
          <div className="row-content">
            <b>Bio:</b> {post.author_bio}
          </div>
          <div className="row-content">
            <b>Post date:</b> {post.date}
          </div>
          {/* ... all other fields */}
          <div className="row-buttons">
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this item?")
                ) {
                  onDelete();
                }
              }}
            >
              Delete
            </button>
            <button onClick={onEdit}>Edit</button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Show2;

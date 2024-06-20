const Show2 = ({ post, onEdit, onDelete }) => {

  const rendered = Object.keys(post.content).map((key) => {
    const field = post.content[key];
    if (typeof field === "object" && field !== null && "value" in field) {
      return (
        <div key={key} className={`row-content ${field.className || ""}`}>
          <b>{key}:</b> {field.value.toString()}
        </div>
      );
    } else {
      return (
        <div key={key} className="row-content">
          <b>{key}:</b> {field.toString()}
        </div>
      );
    }
  });

  return (
    <tr>
      <td className="row">
        <div key={post.id}>
          {rendered}
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

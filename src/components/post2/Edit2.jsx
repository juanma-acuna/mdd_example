import { useState } from "react";

const Edit2 = ({ post, onCancel }) => {
  const [form, setForm] = useState({
    id: post.id,
    title: post.title,
    body: post.body,
    author: post.author,
    author_bio: post.author_bio,
    date: post.date,
    // all other fields
    ...post,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updatePost = (form) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };
    fetch(`http://localhost:3030/posts2/${form.id}`, requestOptions).catch(
      (error) => console.log("error", error)
    );
    onCancel();
  };

  return (
    <tr>
      <td className="row">
        <div key={post.id}>
          <div className="row-title">
            {post.id} -{" "}
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="row-content">
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              className="row-textarea"
            />
          </div>
          <div className="row-content">
            <b>Author:</b>{" "}
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
            />
          </div>
          <div className="row-content">
            <b>Bio:</b>{" "}
            <input
              type="text"
              name="author_bio"
              value={form.author_bio}
              onChange={handleChange}
            />
          </div>
          <div className="row-content">
            <b>Post date:</b>{" "}
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="row-buttons">
            <button onClick={onCancel}>Cancel</button>
            <button
              onClick={() => {
                updatePost(form);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Edit2;

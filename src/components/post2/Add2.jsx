import { useState } from "react";

const Add2 = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    body: "",
    author: "",
    author_bio: "",
    date: "",
    // all other fields
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPost = (form) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };
    fetch(`http://localhost:3030/posts2/`, requestOptions).catch((error) =>
      console.log("error", error)
    );
    onClose();
  };

  return (
    <tr>
      <td className="row">
        <div key="add">
          <div className="row-title">
            <label>Title: </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="row-content">
            <label>Body: </label>
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
            <b>Author Bio:</b>{" "}
            <input
              type="text"
              name="author_bio"
              value={form.author_bio}
              onChange={handleChange}
            />
          </div>
          <div className="row-content">
            <b>Date:</b>{" "}
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="row-buttons">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={() => {
                addPost(form);
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

export default Add2;

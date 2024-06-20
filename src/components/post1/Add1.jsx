import { useState } from "react";

const Add1 = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    body: "",
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
    fetch(`http://localhost:3030/posts1/`, requestOptions).catch(
      (error) => console.log("error", error)
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

export default Add1;

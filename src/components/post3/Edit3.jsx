import { useState } from "react";

const Edit3 = ({ post, onCancel }) => {
  const [form, setForm] = useState({
    id: post.id,
    content: { ...post.content },
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    Object.keys(form.content).forEach((key) => {
      const field = form.content[key];
      if (
        typeof field === "object" &&
        field !== null &&
        "value" in field &&
        field.required &&
        !field.value
      ) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e, key) => {
    setForm({
      ...form,
      content: {
        ...form.content,
        [key]: { ...form.content[key], value: e.target.value },
      },
    });
  };

  const updatePost = (form) => {
    const isValid = validate();
    if (isValid) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      };
      fetch(`http://localhost:3030/posts3/${form.id}`, requestOptions).catch(
        (error) => console.log("error", error)
      );
      onCancel();
    }
  };

  const rendered = Object.keys(form.content).map((key) => {
    const field = form.content[key];
    if (
      typeof field === "object" &&
      field !== null &&
      "value" in field &&
      field.editable
    ) {
      return (
        <div key={key} className={`row-content ${field.className || ""}`}>
          <b>{key}:</b>
          {field.type === "textarea" ? (
            <textarea
              value={field.value}
              onChange={(e) => handleChange(e, key)}
              className="row-textarea"
            />
          ) : field.type === "select" ? (
            <select value={field.value} onChange={(e) => handleChange(e, key)}>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "radio" || field.type === "checkbox" ? (
            field.options.map((option) => (
              <div key={option}>
                <input
                  type={field.type}
                  name={key}
                  value={option}
                  checked={field.value === option}
                  onChange={(e) => handleChange(e, key)}
                />
                {option}
              </div>
            ))
          ) : (
            <input
              type={field.type || "text"}
              name={key}
              value={field.value}
              onChange={(e) => handleChange(e, key)}
              required={field.required}
            />
          )}
          {errors[key] && <div className="error">{errors[key]}</div>}
        </div>
      );
    } else {
      return (
        <div key={key} className="row-content">
          <b>{key}:</b> {field.value} (read-only)
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
            <button onClick={() => updatePost(form)}>Update</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Edit3;

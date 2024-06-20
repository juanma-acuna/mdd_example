import { useState } from "react";

const Add3 = ({ onClose, post3 }) => {
  const [errors, setErrors] = useState({});

  const emptyForm = Object.keys(post3[0].content).reduce((acc, key) => {
    return { ...acc, [key]: { ...post3[0].content[key], value: "" } };
  }, {});

  const [form, setForm] = useState({
    content: emptyForm,
  });

  const handleChange = (e, key) => {
    setForm({
      ...form,
      content: {
        ...form.content,
        [key]: { ...form.content[key], value: e.target.value },
      },
    });
  };

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

  const addPost = (form) => {
    const isValid = validate();
    if (isValid) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      };
      fetch(`http://localhost:3030/posts3/`, requestOptions).catch((error) =>
        console.log("error", error)
      );
      onClose();
    }
  };

  const rendered = Object.keys(form.content).map((key) => {
    const field = form.content[key];
    if (typeof field === "object" && field !== null && "value" in field) {
      return (
        <div key={key} className={`row-content ${field.className || ""}`}>
          <b>{key}:</b>
          <input
            type={field.type || "text"}
            name={key}
            value={field.value}
            onChange={(e) => handleChange(e, key)}
          />
          {errors[key] && <div className="error">{errors[key]}</div>}
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
        <div>
          {rendered}
          <div className="row-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={() => addPost(form)}>Save</button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Add3;

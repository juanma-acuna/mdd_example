import { useEffect, useState } from "react";
import Edit3 from "./Edit3";
import Add3 from "./Add3";
import Show3 from "./Show3";

const Post2 = () => {
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(null);
  const [add, setAdd] = useState(null);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/posts3", requestOptions)
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const closeAddEdit = () => {
    setEdit(null);
    setAdd(null);
    setTimeout(() => {
      getData();
    }, 1000); // timeout to simulate api response time
  };

  const deletePost = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:3030/posts3/${id}`, requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
    setTimeout(() => {
      getData();
    }, 1000); // timeout to simulate api response time
  };

  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>Posts</h1>
        <div>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setAdd(true)}
              disabled={edit !== null || add !== null}
            >
              Add a new post
            </button>
          </div>
          <div className="container">
            <table className="table">
              <tbody>
                {add ? (
                  <Add3 onClose={closeAddEdit} post3={posts}  />
                ) : (
                  posts.map((post) =>
                    edit === post.id ? (
                      <Edit3
                        key={post.id}
                        post={post}
                        onCancel={closeAddEdit}
                        onSave={closeAddEdit}
                      />
                    ) : (
                      <Show3
                        key={post.id}
                        post={post}
                        onEdit={() => setEdit(post.id)}
                        onDelete={() => deletePost(post.id)}
                      />
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post2;

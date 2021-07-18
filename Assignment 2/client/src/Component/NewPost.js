import { useLocation, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [file, seFile] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(false);
  const [email, setUserEmail] = useState("");
  const [fullname, setUserFullname] = useState("");
  const [data, setData] = useState(JSON.parse(localStorage.getItem("profile")));
  let history = useHistory();

  useEffect(() => {
    if (data) {
      setUserEmail(data.email);
      setUserFullname(data.fullname);
    } else {
      history.push("/");
    }
  }, [data]);
  console.log(email, fullname);
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    seFile(e.target.files[0]);
    setError(false);

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        seFile(file);
        setImage(result);
      })
      .catch((err) => {
        console.log(err);
      });
    seFile(e.target.files[0]);
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:4000/newpost", {
        title,
        image,
        description,
        body,
        fullname,
        email,
      });
      console.log(res);
      res.data && window.location.replace("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="newPost">
      <h2>Create New Post</h2>
      {error ? (
        <span style={{ color: "red" }}>Something went wrong!</span>
      ) : null}
      <form onSubmit={postSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Select Image</label>
        <br />
        <input
          type="file"
          name="image"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => handleFileInputChange(e)}
        />
        <br />
        <label>Post Description</label>
        <br />
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label>Post Content</label>
        <br />
        <textarea name="body" onChange={(e) => setBody(e.target.value)} />
        <br />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

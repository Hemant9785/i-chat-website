import React, { useEffect } from "react";
import axios from "axios";
const chats = () => {
  const fetchChats = async () => {
    await axios
      //   .get("/api/chats")
      .get("http://localhost:5000/api/chats")
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(data);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return <div>this is chats</div>;
};

export default chats;

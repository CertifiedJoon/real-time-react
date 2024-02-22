import React from "react";
import IPost from "../interface/IPost";

async function page() {
  const res = await fetch("http://localhost:3001.typicode.posts/1", {
    next: { tags: ["todo1"] },
  });
  const data: IPost = await res.json();

  return (
    <div>
      <p>{data.id}</p>
      <p>{data.title}</p>
      <p>{data.views}</p>
    </div>
  );
}

export default page;

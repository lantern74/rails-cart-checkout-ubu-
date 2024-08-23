import React, { useState } from "react";
import PropTypes from "prop-types";

export default function InstagramPostsGrid({
  onPostSelect,
  posts,
  selectedPostId,
}) {
  const [selectedPost, setSelectedPost] = useState(
    posts.find((post) => post.id === selectedPostId)
  );
  const handlePostSelect = (post) => {
    setSelectedPost(post);
    onPostSelect(post);
  };
  return (
    <div
      style={{
        display: "grid",
        height: "50vh",
        overflowY: "auto",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "1rem",
            border:
              selectedPost?.id === post.id
                ? "1px solid blue"
                : "1px solid #E5E7EB", // Changed here
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "white",
          }}
          onClick={() => handlePostSelect(post)}>
          <img
            src={post.media_url}
            alt={post.caption}
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
          />
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
}

InstagramPostsGrid.propTypes = {
  onPostSelect: PropTypes.func.isRequired,
};

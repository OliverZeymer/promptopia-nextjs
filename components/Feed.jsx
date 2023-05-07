"use client";
import { useState, useEffect } from "react";

import PromptCard from "@components/PromptCard";

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
}
export default function Feed() {
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);
  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or user" value={searchValue} required onChange={handleSearchChange} className="search_input peer" />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

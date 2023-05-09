"use client";
import { useState, useEffect } from "react";

import PromptCard from "@components/PromptCard";
import { motion } from "framer-motion";
function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard key={post._id} index={index} post={post} handleTagClick={handleTagClick} />
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
  const filteredPosts = posts.filter((post) => {
    return (
      post.creator.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.creator.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.prompt.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <section className="feed">
      <div className="relative w-full flex-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="relative w-full max-w-xl mx-auto">
          <img src="/assets/icons/search.svg" alt="Search Icon" className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4" />
          <input type="text" placeholder="Search for a tag or user" value={searchValue} onChange={handleSearchChange} className="search_input peer" />
        </motion.div>
      </div>

      <PromptCardList
        data={searchValue !== "" ? filteredPosts : posts}
        handleTagClick={(tag) => {
          setSearchValue(tag);
        }}
      />
    </section>
  );
}

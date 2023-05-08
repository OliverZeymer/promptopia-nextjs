"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
export default function UserProfile({ params }) {
  const router = useRouter();
  const id = params?.id;
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
    }

    if (id) fetchPosts();
  }, [id]);
  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }
  async function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return <Profile name={`${name}'s`} desc={`Welcome to ${name}'s profile! Check out their prompts below`} data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />;
}

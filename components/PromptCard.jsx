"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
export default function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const [copied, setCopied] = useState("");
  function handleCopy() {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 1000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image src={post.creator.image} alt="user image" width={40} height={40} className="rounded-full object-contain" />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div onClick={handleCopy} className="copy_btn">
          <Image src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} alt="copy icon" width={20} height={20} />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
        className="font-inter text-sm blue_gradient cursor-pointer">
        {post.tag}
      </p>
    </div>
  );
}
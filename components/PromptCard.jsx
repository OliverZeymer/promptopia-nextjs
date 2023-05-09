"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
export default function PromptCard({ index, post, handleTagClick, handleEdit, handleDelete }) {
  const [copiedImage, setCopiedImage] = useState("/assets/icons/copy.svg");
  const router = useRouter();
  const { data: session } = useSession();
  const pathName = usePathname();
  function handleCopy() {
    navigator.clipboard.writeText(post.prompt);
    setCopiedImage("/assets/icons/tick.svg");
    toast.success("Prompt copied to clipboard!", {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      setCopiedImage("/assets/icons/copy.svg");
    }, 2000);
  }
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} className="prompt_card overflow-hidden">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center cursor-pointer gap-3"
          onClick={() => {
            router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
          }}>
          <Image src={post.creator.image} alt={post.creator.username} width={40} height={40} className="rounded-full object-contain" />
          <div className="flex flex-col overflow-hidden">
            <h3 className="font-satoshi font-semibold text-gray-900 truncate">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500 truncate">{post.creator.email}</p>
          </div>
        </div>
        <div onClick={handleCopy} className="copy_btn min-w-[20px]">
          <motion.div
            key={copiedImage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -10,
            }}>
            <Image src={copiedImage} alt="copy icon" width={20} height={20} />
          </motion.div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
        className="font-inter text-sm colorful_gradient cursor-pointer">
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p onClick={handleDelete} className="font-inter text-sm orange_gradient cursor-pointer">
            Delete
          </p>
        </div>
      )}
    </motion.div>
  );
}

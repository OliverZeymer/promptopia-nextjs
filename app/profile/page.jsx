"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "@components/Profile";
export default function Profile() {
  function handleEdit(data) {
    console.log(data);
  }
  async function handleDelete(data) {
    console.log(data);
  }

  return <Profile name="My" desc="Welcome to your personalized profile page" data={[]} handleEdit={handleEdit} handleDelete={handleDelete} />;
}

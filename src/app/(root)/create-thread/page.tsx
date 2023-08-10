import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="text-heading1-bold text-white mb-11">Create Threads</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
};

export default Page;

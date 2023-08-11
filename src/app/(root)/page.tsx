//app/page.tsx
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";

import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const res = await fetchPosts(1, 30);
  // console.log(res);
  const user = await currentUser();
  return (
    <>
      <h1 className="head-text text-left"> Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {res.posts.length === 0 ? (
          <p className="no-result">No Threads Found</p>
        ) : (
          <>
            {res.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}

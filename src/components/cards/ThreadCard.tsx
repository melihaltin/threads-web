// "use client";

import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  label: string;
  link: string;
  icon: string;
  onClick: () => void;
}

interface Props {
  id: string;
  currentUserId: string;
  parentId: string;
  content: string;
  author: {
    name: string;
    id: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  const buttons: ButtonProps[] = [
    {
      label: "heart",
      link: "",
      icon: "/assets/heart-gray.svg",
      onClick: () => console.log("Button 1 clicked"),
    },
    {
      label: "reply",
      link: `/thread/${id}`,
      icon: "/assets/reply.svg",
      onClick: () => console.log("Button 2 clicked"),
    },
    {
      label: "repost",
      link: "",
      icon: "/assets/repost.svg",
      onClick: () => console.log("Button 3 clicked"),
    },
    {
      label: "share",
      link: "",
      icon: "/assets/share.svg",
      onClick: () => console.log("Button 4 clicked"),
    },
  ];

  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between ">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                fill
                className="rounded-full cursor-pointer"
              />
            </Link>

            <div className="thread-card_bar "></div>
          </div>

          <div className="flex w-full flex-col ">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2 ">{content}</p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5 ">
                {buttons.map((button) => (
                  <Link href={button.link}>
                    <Image
                      key={button.label}
                      alt={button.label}
                      src={button.icon}
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                ))}
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${parentId}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;

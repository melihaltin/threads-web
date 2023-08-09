"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
// import { FilterQuery, SortOrder } from "mongoose";

// import Community from "../models/community.model";
// import Thread from "../models/thread.model";

// import { connectToDB } from "../mongoose";

// export async function fetchUser(userId: string) {
//   try {
//     connectToDB();

//     return await User.findOne({ id: userId }).populate({
//       path: "communities",
//       model: Community,
//     });
//   } catch (error: any) {
//     throw new Error(`Failed to fetch user: ${error.message}`);
//   }
// }

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      {
        userName: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

// export async function fetchUserPosts(userId: string) {
//   try {
//     connectToDB();

//     // Find all threads authored by the user with the given userId
//     const threads = await User.findOne({ id: userId }).populate({
//       path: "threads",
//       model: Thread,
//       populate: [
//         {
//           path: "community",
//           model: Community,
//           select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
//         },
//         {
//           path: "children",
//           model: Thread,
//           populate: {
//             path: "author",
//             model: User,
//             select: "name image id", // Select the "name" and "_id" fields from the "User" model
//           },
//         },
//       ],
//     });
//     return threads;
//   } catch (error) {
//     console.error("Error fetching user threads:", error);
//     throw error;
//   }
// }

// // Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
    // .populate({
    //   path: "communities",
    //   model: User,
    // })
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

// export async function getActivity(userId: string) {
//   try {
//     connectToDB();

//     // Find all threads created by the user
//     const userThreads = await Thread.find({ author: userId });

//     // Collect all the child thread ids (replies) from the 'children' field of each user thread
//     const childThreadIds = userThreads.reduce((acc, userThread) => {
//       return acc.concat(userThread.children);
//     }, []);

//     // Find and return the child threads (replies) excluding the ones created by the same user
//     const replies = await Thread.find({
//       _id: { $in: childThreadIds },
//       author: { $ne: userId }, // Exclude threads authored by the same user
//     }).populate({
//       path: "author",
//       model: User,
//       select: "name image _id",
//     });

//     return replies;
//   } catch (error) {
//     console.error("Error fetching replies: ", error);
//     throw error;
//   }
// }

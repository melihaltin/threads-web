import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName + " " + user?.lastName,
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className="flex mx-auto max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">onboarding</h1>
      <p>Complete your profile to use Threds-Clone</p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} buttonTitle="Continue" />
      </section>
    </main>
  );
};

export default Page;

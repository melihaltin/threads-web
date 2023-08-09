import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();
  return (
    <main className="flex mx-auto max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">onboarding</h1>
      <p>Complete your profile to use Threds-Clone</p>
      <section className="mt-9 bg-dark-2 p-10">
        {" "}
        <AccountProfile />{" "}
      </section>
    </main>
  );
};

export default Page;

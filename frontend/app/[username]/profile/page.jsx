import DefaultLayout from "@/components/DefaultLayout";
import DisplayPosts from "@/components/DisplayPosts";

export default function profile() {
  return (
    <DefaultLayout>
      <div className="relative w-full text-purple-400 mt-10 px-5">
        This is user's profile
      </div>
    </DefaultLayout>
  );
}

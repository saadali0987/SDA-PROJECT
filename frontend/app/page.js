import DefaultLayout from "@/components/DefaultLayout";
import DisplayPosts from "@/components/DisplayPosts";


export default function Home() {
  return (
    <DefaultLayout>
      <div className="relative w-full mt-10 px-5">
        <DisplayPosts/>
      </div>
    </DefaultLayout>
  );
}


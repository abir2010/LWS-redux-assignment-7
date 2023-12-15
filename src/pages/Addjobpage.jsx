import Sidebar from "./../components/Sidebar/Sidebar";
import Form from "./../components/Forms/Form";
import { useSelector } from "react-redux";

export default function Addjobpage() {
  const { editing } = useSelector((state) => state.jobs);
  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
      <Sidebar />
      <div className="lg:pl-[14rem] mt-[5.8125rem]">
        <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
          <h1 className="mb-10 text-center lws-section-title">
            {editing?.id ? "Edit Job" : "Add Job"}
          </h1>

          <div className="max-w-3xl mx-auto">
            <Form />
          </div>
        </main>
      </div>
    </div>
  );
}

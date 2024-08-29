import { IoInformationCircleOutline } from "react-icons/io5";

const One = () => {
  return (
    <div className="py-4">
      <div className="space-y-4">
        <p className="text-2xl font-medium">Let's create your bag</p>
        <p className="text-xs font-light">
          Bags are your personal filing cabinets within the app.
          <br /> Organize your files by topic, or any way that works best for
          you. Everything you store in your Bags stays readily accessible on
          your device, even when you're offline.
        </p>

        <p className="text-xl">Name your very own bag</p>
        <input
          type="text"
          className="bg-transparent border placeholder:text-xs border-white w-full rounded-md py-1 px-3"
          placeholder = "Enter School Email"
        />
        <div className="w-full bg-[#002241] flex gap-1 p-2 rounded-lg items-center justify-evenly">
          <IoInformationCircleOutline className="text-[#1D90FA] text-4xl" />
          <p className="text-[#1D90FA] text-xs p-1">
            The bag name will be displayed alongside files when you share them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default One;

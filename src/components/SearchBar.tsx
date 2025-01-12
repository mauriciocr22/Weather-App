import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center bg-[#fefefe] h-12 w-[512px] rounded-3xl border border-[#e5e5e5] shadow-md hover:shadow-sm transition-shadow duration-200">
      <FaSearch className="fill-gray-500" size={20} />
      <input className="w-[88%] focus:outline-none pl-4 text-lg" placeholder="Digite sua cidade" type="text" />
    </div>
  )
}
import HeaderNavBar from "@/components/HeaderNavBar";
import CategoryList from "@/components/Home/CategoryList";
import Image from "next/image";
import RangeSelect from "@/components/Home/RangeSelect";

export default function Home() {
  return (
    <div className="grid grid-cols-4 h-screen">
      <div className="bg-red-300">
        <CategoryList />
        <RangeSelect />
      </div>
      <div className="bg-green-300 col-span-3">
        Second
      </div>
      
    </div>
  );
}

import { Link } from "@nextui-org/react";

export default function AppNavbar() {
  return (
    <div className="w-full border-b border-gray-300 bg-white px-32">
      <div className="container mx-auto py-2 flex items-center">
        <Link color="primary" href="/">
          <p className="text-xl font-bold text-inherit">Akakçe</p>
        </Link>
      </div>
    </div>
  );
}
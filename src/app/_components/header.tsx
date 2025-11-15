import Link from "next/link";
import { SearchWrapper } from "./search-wrapper";

const Header = () => {
  return (
    <div className="mb-20 mt-8">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-4 flex items-center">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <div className="w-full max-w-2xl">
        <SearchWrapper />
      </div>
    </div>
  );
};

export default Header;

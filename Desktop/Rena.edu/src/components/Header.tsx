import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E6E3] bg-[#FAF9F7]/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-semibold text-[#2B2B2B]">
          Rena.edu
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/space"
            className="text-[#2B2B2B] font-medium hover:text-[#2B2B2B]/70 transition-colors"
          >
            The Space
          </Link>
          <Link
            href="/book"
            className="bg-[#FF7A5C] text-white px-6 py-2 rounded-full font-medium hover:bg-[#FF7A5C]/90 transition-colors"
          >
            Submit a Class
          </Link>
        </div>
      </nav>
    </header>
  );
}


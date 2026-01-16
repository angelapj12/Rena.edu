export default function Footer() {
  return (
    <footer className="border-t border-[#E8E6E3] bg-[#FAF9F7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#2B2B2B]/60 text-sm">
            &copy; {new Date().getFullYear()} Rena.edu
          </p>
          <p className="text-[#2B2B2B]/60 text-sm">
            A licensed, fully equipped education space
          </p>
        </div>
      </div>
    </footer>
  );
}


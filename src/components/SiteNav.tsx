import Link from "next/link";

export function SiteNav() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Reserve Memorials
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/design" className="hover:underline">
            Design
          </Link>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/portal" className="hover:underline">
            Portal
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}



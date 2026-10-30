import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white">404</h1>
      <p className="mt-2 text-base text-fk-textSecondary">Page not found / पृष्ठ नहीं मिला</p>
      <Link
        href="/en"
        className="mt-6 rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-canvas"
      >
        Return to FitKarma Home
      </Link>
    </div>
  );
}

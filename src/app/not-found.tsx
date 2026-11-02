import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-canvas text-ink-primary">
      <h1 className="text-6xl font-extrabold text-brand-accent mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found / पृष्ठ नहीं मिला</h2>
      <p className="text-ink-muted mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/en"
        className="inline-block px-6 py-3 rounded-xl bg-brand-accent text-canvas font-semibold hover:bg-brand-green transition-colors"
      >
        Return to FitKarma Home
      </Link>
    </div>
  );
}

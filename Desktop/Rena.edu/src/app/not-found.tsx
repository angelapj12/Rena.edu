import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-base-light-subtle flex flex-col items-center justify-center px-6 md:px-8 lg:px-12">
      <h1 className="text-h2 text-base-dark mb-2">
        Page Not Found
      </h1>
      <p className="text-body-lg text-base-dark/70 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/en"
        className="bg-base-dark text-base-light px-6 py-3 rounded-full font-medium hover:bg-base-dark/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

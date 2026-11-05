import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>Sorry, we couldn't find that page.</p>
      <Link href="/">Back to home</Link>
    </main>
  );
}

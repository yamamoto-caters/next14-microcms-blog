import Link from 'next/link';
import '@/styles/404.scss';

export default function NotFound() {
  return (
    <div className="main">
      <h1>Not Found</h1>
      <Link href="/" className="btn">
        TOP
      </Link>
    </div>
  );
}

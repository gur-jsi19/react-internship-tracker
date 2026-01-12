import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-gray-600">Page not found.</p>

      <Link to="/" className="text-blue-600 underline">
        Go back to Dashboard
      </Link>
    </div>
  );
}

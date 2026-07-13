import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <>
      <div className="text-center">
        <p className="text-purple-500 font-bold text-sm tracking-widest uppercase mb-4">
          Error 404
        </p>

        <h1 className="font-black text-4xl md:text-5xl text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition-colors text-white font-bold py-3 px-8 rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    </>
  )
}
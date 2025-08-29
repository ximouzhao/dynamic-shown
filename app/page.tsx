import Link from 'next/link';
import { getAllConcepts } from '@/lib/concepts';

export default function Home() {
  const concepts = getAllConcepts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Dynamic Concepts
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explore AI-generated explanations of complex concepts. 
          Each page dynamically presents ideas in an engaging and accessible way.
        </p>
        <Link
          href="/concepts"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Explore Concepts
        </Link>
      </div>

      {/* Featured Concepts */}
      {concepts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.slice(0, 6).map((concept) => (
              <Link
                key={concept.slug}
                href={`/concepts/${concept.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {concept.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {concept.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {concept.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Getting Started */}
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Concepts</h3>
            <p className="text-gray-600 mb-4">
              Discover a wide range of topics explained through AI-generated content.
            </p>
            <Link
              href="/concepts"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View all concepts →
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
            <p className="text-gray-600">
              Each concept page is carefully crafted to present complex ideas in 
              an intuitive and engaging manner, making learning accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

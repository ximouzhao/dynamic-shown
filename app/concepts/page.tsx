import Link from 'next/link';
import { getAllConcepts } from '@/lib/concepts';

export default function ConceptsPage() {
  const concepts = getAllConcepts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          All Concepts
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse through our collection of AI-generated explanations covering a wide range of topics.
        </p>
      </div>

      {concepts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Concepts Yet</h3>
            <p className="text-gray-600 mb-4">
              Concepts will appear here once you add markdown files to the content directory.
            </p>
            <div className="text-sm text-gray-500">
              <p>To add a concept, create a markdown file in the <code className="bg-gray-100 px-1 rounded">content/</code> directory.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <Link
              key={concept.slug}
              href={`/concepts/${concept.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 group"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {concept.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {concept.description}
              </p>
              
              {concept.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {concept.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="text-xs text-gray-500">
                Updated {new Date(concept.updatedAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

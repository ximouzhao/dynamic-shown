import { notFound } from 'next/navigation';
import { getConceptBySlug, getAllConceptSlugs } from '@/lib/concepts';
import type { Metadata } from 'next';

interface ConceptPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllConceptSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  
  if (!concept) {
    return {
      title: 'Concept Not Found',
    };
  }

  return {
    title: `${concept.title} | Dynamic Concepts`,
    description: concept.description,
  };
}

export default async function ConceptPage({ params }: ConceptPageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {concept.title}
        </h1>
        
        {concept.description && (
          <p className="text-lg text-gray-600 mb-6">
            {concept.description}
          </p>
        )}

        {concept.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {concept.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-500 border-b border-gray-200 pb-6">
          Last updated: {new Date(concept.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Content */}
      <div 
        className="concept-content max-w-none"
        dangerouslySetInnerHTML={{ __html: concept.htmlContent }}
      />
    </div>
  );
}

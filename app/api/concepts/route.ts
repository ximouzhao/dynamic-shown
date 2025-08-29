import { NextRequest, NextResponse } from 'next/server';
import { getAllConcepts } from '@/lib/concepts';

export async function GET() {
  try {
    const concepts = getAllConcepts();
    
    // Return concept metadata only (without full HTML content)
    const conceptsMetadata = concepts.map(concept => ({
      slug: concept.slug,
      title: concept.title,
      description: concept.description,
      tags: concept.tags,
      createdAt: concept.createdAt,
      updatedAt: concept.updatedAt,
    }));

    return NextResponse.json(conceptsMetadata);
  } catch (error) {
    console.error('Error fetching concepts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch concepts' },
      { status: 500 }
    );
  }
}

import fs from 'fs';
import path from 'path';

export interface Concept {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  htmlContent: string;
  createdAt: string;
  updatedAt: string;
}

const conceptsDirectory = path.join(process.cwd(), 'content');

export function getAllConcepts(): Concept[] {
  try {
    // Check if content directory exists
    if (!fs.existsSync(conceptsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(conceptsDirectory);
    const allConcepts = fileNames
      .filter((name) => name.endsWith('.html'))
      .map((name) => {
        const slug = name.replace(/\.html$/, '');
        return getConceptBySlug(slug);
      })
      .filter((concept): concept is Concept => concept !== null);

    return allConcepts.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
  } catch (error) {
    console.error('Error reading concepts:', error);
    return [];
  }
}

export function getConceptBySlug(slug: string): Concept | null {
  try {
    const fullPath = path.join(conceptsDirectory, `${slug}.html`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Extract metadata from HTML comments at the top of the file
    const metadataMatch = fileContents.match(/<!--\s*META\s*([\s\S]*?)\s*-->/);
    let metadata = {
      title: slug,
      description: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (metadataMatch) {
      try {
        const metadataJson = metadataMatch[1].trim();
        metadata = { ...metadata, ...JSON.parse(metadataJson) };
      } catch (error) {
        console.warn(`Error parsing metadata for ${slug}:`, error);
      }
    }

    // Remove metadata comment from content
    const htmlContent = fileContents.replace(/<!--\s*META\s*[\s\S]*?\s*-->/, '').trim();

    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      tags: metadata.tags,
      htmlContent,
      createdAt: metadata.createdAt,
      updatedAt: metadata.updatedAt,
    };
  } catch (error) {
    console.error(`Error reading concept ${slug}:`, error);
    return null;
  }
}

export function getAllConceptSlugs(): string[] {
  try {
    if (!fs.existsSync(conceptsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(conceptsDirectory);
    return fileNames
      .filter((name) => name.endsWith('.html'))
      .map((name) => name.replace(/\.html$/, ''));
  } catch (error) {
    console.error('Error reading concept slugs:', error);
    return [];
  }
}

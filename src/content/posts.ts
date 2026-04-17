// Shared post data source - used by both Home and Writing pages
// This prevents data drift when posts are updated in one place but not the other

export interface PostData {
  slug: string
  title: string
  excerpt: string
  section: 'daydreamer' | 'business'
  category: string
  date: string
  readTime?: string
}

export const allPosts: PostData[] = [
  {
    slug: 'building-apps-for-jazz-clubs',
    title: 'Building Apps for Jazz Clubs',
    excerpt: 'How Dimitriou\'s Jazz Alley is rethinking membership in the digital age.',
    section: 'business',
    category: 'community-tech',
    date: '2025-01-15',
    readTime: '8 min',
  },
  {
    slug: 'the-brutalist-review',
    title: 'The Brutalist',
    excerpt: 'A sprawling, ambitious portrait of the American dream\'s dark side.',
    section: 'daydreamer',
    category: 'film',
    date: '2025-01-12',
    readTime: '5 min',
  },
  {
    slug: 'the-daydreamer-method',
    title: 'The Daydreamer Method',
    excerpt: 'A framework for building businesses that actually fit your life.',
    section: 'business',
    category: 'creative-business',
    date: '2025-01-10',
    readTime: '12 min',
  },
  {
    slug: 'designing-beer-cans',
    title: 'What Beer Can Design Taught Me About Constraints',
    excerpt: 'Lessons from fitting an entire brand story onto 12 ounces of aluminum.',
    section: 'daydreamer',
    category: 'creativity',
    date: '2025-01-05',
    readTime: '6 min',
  },
  {
    slug: 'tokyo-observations',
    title: 'Two Weeks in Tokyo',
    excerpt: 'Notes on convenience, craft, and what America gets wrong about efficiency.',
    section: 'daydreamer',
    category: 'musings',
    date: '2025-01-02',
    readTime: '10 min',
  },
  {
    slug: 'membership-programs-for-breweries',
    title: 'Why Every Brewery Needs a Membership Program',
    excerpt: 'The economics of loyalty in craft beverage.',
    section: 'business',
    category: 'beverage-world',
    date: '2024-12-28',
    readTime: '7 min',
  },
]

// Get featured posts (most recent 3) for the homepage
export const featuredPosts = allPosts.slice(0, 3).map(({ slug, title, excerpt, category, date }) => ({
  slug,
  title,
  excerpt,
  category: getCategoryLabel(category),
  date,
}))

function getCategoryLabel(categoryId: string): string {
  const labels: Record<string, string> = {
    'community-tech': 'Community & Tech',
    'creative-business': 'Creative Business',
    'creativity': 'Creativity',
    'film': 'Film',
    'books': 'Books & Reading',
    'musings': 'Musings',
    'building-things': 'Building Things',
    'beverage-world': 'Beverage World',
  }
  return labels[categoryId] || categoryId
}

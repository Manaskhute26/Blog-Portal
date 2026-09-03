import { getAllPostsFromDB } from '@/lib/posts';
import { HeroSection } from '@/components/HeroSection';
import { BlogFeed } from '@/components/BlogFeed';

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getAllPostsFromDB();

  return (
    <div className="space-y-4">
      <HeroSection />
      
      {/* Featured / Feed Section */}
      <div id="articles">
        <BlogFeed posts={posts} />
      </div>
    </div>
  );
}

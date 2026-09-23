export const metadata = {
  title: 'MyFeed',
  description: 'Personalized feed of watched clubs and bookmarked articles.',
};

import { FeedView } from '@/components/FeedView';

export default function FeedPage() {
  return <FeedView />;
}

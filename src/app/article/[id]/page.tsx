import { ArticleDetailView } from '@/components/ArticleDetailView';

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  return <ArticleDetailView articleId={params.then((p) => p.id)} />;
}

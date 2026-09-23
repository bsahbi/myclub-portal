import { ArticleDetailView } from '@/components/ArticleDetailView';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticleDetailView articleId={id} />;
}

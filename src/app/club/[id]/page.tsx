import { ClubDetailView } from '@/components/ClubDetailView';

export default function ClubPage({ params }: { params: Promise<{ id: string }> }) {
  return <ClubDetailView clubId={params.then((p) => p.id)} />;
}

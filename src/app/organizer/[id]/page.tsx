import { OrganizerProfileView } from '@/components/OrganizerProfileView';

export default async function OrganizerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrganizerProfileView organizerId={id} />;
}

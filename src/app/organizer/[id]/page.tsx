import { OrganizerProfileView } from '@/components/OrganizerProfileView';

export default function OrganizerPage({ params }: { params: Promise<{ id: string }> }) {
  return <OrganizerProfileView organizerId={params.then((p) => p.id)} />;
}

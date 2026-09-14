import { CoachProfileView } from '@/components/CoachProfileView';

export default function CoachPage({ params }: { params: Promise<{ id: string }> }) {
  return <CoachProfileView coachId={params.then((p) => p.id)} />;
}

import { CoachProfileView } from '@/components/CoachProfileView';

export default async function CoachPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CoachProfileView coachId={id} />;
}

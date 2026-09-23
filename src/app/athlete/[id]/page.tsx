import { AthleteProfileView } from '@/components/AthleteProfileView';

export default async function AthletePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AthleteProfileView athleteId={id} />;
}

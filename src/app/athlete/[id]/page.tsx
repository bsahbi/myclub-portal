import { AthleteProfileView } from '@/components/AthleteProfileView';

export default function AthletePage({ params }: { params: Promise<{ id: string }> }) {
  return <AthleteProfileView athleteId={params.then((p) => p.id)} />;
}

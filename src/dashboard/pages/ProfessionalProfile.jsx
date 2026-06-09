import { Link } from 'react-router-dom';
import DashboardPage from '@/dashboard/components/DashboardPage';
import ProfessionalProfileCard from '@/dashboard/components/ProfessionalProfileCard';
import ProfileCompletion from '@/dashboard/components/ProfileCompletion';
import ImageUpload from '@/dashboard/components/ImageUpload';
import LoadingState from '@/dashboard/components/LoadingState';
import Icon from '@/components/ui/Icon';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';

export default function ProfessionalProfile() {
  const { data: pro, loading } = useAsync(() => api.myProProfile(), []);

  if (loading || !pro) {
    return (
      <DashboardPage title="Profili im" subtitle="Menaxho informacionin që shohin klientët.">
        <LoadingState rows={3} />
      </DashboardPage>
    );
  }

  const checklist = [
    { label: 'Përshkrim profesional', done: !!pro.bio },
    { label: 'Aftësi / shërbime', done: (pro.skills?.length || 0) > 0 },
    { label: 'Portofol', done: (pro.portfolio?.length || 0) > 0 },
    { label: 'Verifikim NIPT', done: !!pro.nipt },
  ];
  const percent = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);
  const isVerified = pro.verified;

  return (
    <DashboardPage
      title="Profili im"
      subtitle="Menaxho informacionin që shohin klientët."
      action={<Link to={`/professionals/${pro.slug}`} className="btn btn-outline btn-sm"><Icon name="ExternalLink" className="h-4 w-4" /> Shiko publikun</Link>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ProfessionalProfileCard professional={pro} />

          <div className="card p-6">
            <h3 className="font-semibold text-navy-900">Portofol</h3>
            {pro.portfolio?.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {pro.portfolio.map((c, i) => (
                  <div key={i} className="aspect-square rounded-xl" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }} />
                ))}
              </div>
            )}
            <div className="mt-4">
              <ImageUpload label="Shto foto pune" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ProfileCompletion percent={percent} items={checklist} />
          <div className="card p-5">
            <h3 className="font-semibold text-navy-900">Statusi i verifikimit</h3>
            {isVerified ? (
              <>
                <p className="mt-2 flex items-center gap-2 text-sm text-emerald-700">
                  <Icon name="BadgeCheck" className="h-4 w-4" /> Profil i verifikuar
                </p>
                <p className="mt-1 text-xs text-slate-400">Identiteti dhe kontaktet u konfirmuan.</p>
              </>
            ) : (
              <>
                <p className="mt-2 flex items-center gap-2 text-sm text-amber-700">
                  <Icon name="Clock" className="h-4 w-4" /> Në proces verifikimi
                </p>
                <p className="mt-1 text-xs text-slate-400">Profili do të aktivizohet pasi ta aprovojë administratori.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}

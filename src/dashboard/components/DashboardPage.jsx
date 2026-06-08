import DashboardHeader from '@/dashboard/components/DashboardHeader';

export default function DashboardPage({ title, subtitle, action, children }) {
  return (
    <>
      <DashboardHeader title={title} subtitle={subtitle} action={action} />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
        <div className="mb-6 lg:hidden">
          <h1 className="text-xl font-bold text-navy-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {children}
      </div>
    </>
  );
}

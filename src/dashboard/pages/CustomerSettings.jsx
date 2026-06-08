import DashboardPage from '@/dashboard/components/DashboardPage';
import SettingsContent from '@/dashboard/components/SettingsContent';

export default function CustomerSettings() {
  return (
    <DashboardPage title="Cilësimet" subtitle="Menaxho njoftimet, privatësinë dhe llogarinë.">
      <SettingsContent />
    </DashboardPage>
  );
}

import SubjectManager from "@/components/settings page/SubjectManager";

const SettingsPage = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      {/* Subject Manager Section */}
      <SubjectManager />

    </div>
  );
};

export default SettingsPage;
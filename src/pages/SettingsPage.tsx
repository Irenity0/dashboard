import SubjectManager from "@/settings components/SubjectManager";

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
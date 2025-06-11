import SubjectManager from "@/components/settings page/SubjectManager"
import FooterQuoteSettings from "@/components/settings page/FooterQuoteSettings"

const SettingsPage = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      {/* Subject Manager Section */}
      <SubjectManager />

      {/* Footer Quote Settings */}
      <FooterQuoteSettings />
    </div>
  )
}

export default SettingsPage
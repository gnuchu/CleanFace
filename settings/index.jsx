function SettingsPage(props) {
  return (
    <Page>
      <Section title="Date Settings">
        <Toggle settingsKey="USDateFormat" label="Use MM/DD/YYYY as the date format." />
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingsPage);

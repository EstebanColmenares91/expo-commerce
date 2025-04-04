import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import {
  Bell,
  Moon,
  Globe,
  Shield,
  CircleHelp as HelpCircle,
  Info,
  LucideIcon,
} from 'lucide-react-native';
import { useState } from 'react';
import Constants from 'expo-constants';

interface SettingRow {
  icon: LucideIcon;
  label: 'Push Notifications' | 'Dark Mode' | 'Privacy Settings' | 'About';
  value: '';
  onPress: () => {};
  showToggle: boolean;
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

const SettingSection = ({ title, children }) => (
  <View className="mt-6">
    <Text className="mb-2 px-4 text-sm font-semibold uppercase text-gray-500">{title}</Text>
    <View className="rounded-lg bg-white">{children}</View>
  </View>
);

const SettingRow = ({
  icon: Icon,
  label,
  value,
  onPress,
  showToggle = false,
  isEnabled = false,
  onToggle,
}: Partial<SettingRow>) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between border-b border-gray-100 p-4">
    <View className="flex-1 flex-row items-center">
      <Icon size={20} color="#4b5563" />
      <Text className="ml-3 flex-1 text-base text-gray-700">{label}</Text>
    </View>
    {showToggle ? (
      <Switch value={isEnabled} onValueChange={onToggle} />
    ) : (
      <View className="flex-row items-center">
        {value && <Text className="mr-2 text-gray-500">{value}</Text>}
      </View>
    )}
  </TouchableOpacity>
);

export default function Settings() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Text className="mt-1 px-4 pb-4 pt-8 text-lg text-gray-700">
        Customize your app experience
      </Text>

      <SettingSection title="Preferences">
        <SettingRow
          icon={Bell}
          label="Push Notifications"
          showToggle
          isEnabled={pushNotifications}
          onToggle={setPushNotifications}
        />
        <SettingRow
          icon={Moon}
          label="Dark Mode"
          showToggle
          isEnabled={darkMode}
          onToggle={setDarkMode}
        />
        <SettingRow icon={Globe} label="Language" value="English" onPress={() => {}} />
      </SettingSection>

      <SettingSection title="Security">
        <SettingRow icon={Shield} label="Privacy Settings" onPress={() => {}} />
      </SettingSection>

      <SettingSection title="Support">
        <SettingRow icon={HelpCircle} label="Help Center" onPress={() => {}} />
        <SettingRow
          icon={Info}
          label="About"
          value={`Version ${Constants.expoConfig?.version || '1.0.0'}`}
          onPress={() => {}}
        />
      </SettingSection>

      <View className="mt-4 p-4">
        <TouchableOpacity className="rounded-lg bg-red-50 py-3">
          <Text className="text-center font-semibold text-red-500">Delete Account</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center p-4">
        <Text className="text-sm text-gray-500">2025</Text>
      </View>
    </ScrollView>
  );
}

import { Tabs } from 'expo-router';

export default function TabsLayout(): React.JSX.Element {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="shopping-cart"
        options={{
          title: 'Shopping Cart',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

import { NativeTabs } from 'expo-router/native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="masa">
        <NativeTabs.Trigger.Label>Masa</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="scalemass"
          md="scale"
          src={require('@/assets/images/tabIcons/scale.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="distancia">
        <NativeTabs.Trigger.Label>Distancia</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="ruler"
          md="straighten"
          src={require('@/assets/images/tabIcons/ruler.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

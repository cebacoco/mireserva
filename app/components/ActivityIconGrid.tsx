import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLang } from '../lib/i18n';

const { width } = Dimensions.get('window');

interface ActivityIconGridProps {
  activities?: any[];
  onActivityPress?: (activity: any) => void;
  onFishingPress?: () => void;
  onTabSwitch?: (tab: string) => void;
  activeTab?: string;
}

const TAB_ICONS: {
  key: string;
  labelKey: string;
  icon: string;
  lib: 'ion' | 'mci';
  color: string;
  bgColor: string;
}[] = [
  { key: 'food', labelKey: 'tab_food', icon: 'restaurant', lib: 'ion', color: '#EA580C', bgColor: '#FFF7ED' },
  { key: 'water', labelKey: 'tab_water', icon: 'waves', lib: 'mci', color: '#0D9488', bgColor: '#F0FDFA' },
  { key: 'island', labelKey: 'tab_island', icon: 'palm-tree', lib: 'mci', color: '#16A34A', bgColor: '#F0FDF4' },
  { key: 'fishing', labelKey: 'tab_fishing', icon: 'fish', lib: 'mci', color: '#2563EB', bgColor: '#EFF6FF' },
  { key: 'overnight', labelKey: 'tab_overnight', icon: 'sleep', lib: 'mci', color: '#7C3AED', bgColor: '#F5F3FF' },
];

export default function ActivityIconGrid({ onTabSwitch, activeTab }: ActivityIconGridProps) {
  const { t } = useLang();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLine} />
        <Text style={styles.headerLabel}>{t('explore_activities')}</Text>
        <View style={styles.headerLine} />
      </View>

      <View style={styles.grid}>
        {TAB_ICONS.map((item) => {
          const isActive = item.key === activeTab;
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.iconItem}
              onPress={() => onTabSwitch?.(item.key)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: isActive ? item.color : item.bgColor },
                ]}
              >
                <View
                  style={[
                    styles.iconInner,
                    { backgroundColor: isActive ? item.color : item.color },
                    isActive && { opacity: 0.85 },
                  ]}
                >
                  {item.lib === 'ion' ? (
                    <Ionicons name={item.icon as any} size={24} color="#fff" />
                  ) : (
                    <MaterialCommunityIcons name={item.icon as any} size={24} color="#fff" />
                  )}
                </View>
              </View>
              <Text
                style={[styles.iconLabel, isActive && { color: item.color, fontWeight: '800' }]}
              >
                {t(item.labelKey)}
              </Text>
              {isActive && (
                <View style={[styles.activeDot, { backgroundColor: item.color }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginHorizontal: 12,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  iconItem: {
    alignItems: 'center',
    width: (width - 40) / 5,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconInner: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 4,
  },
});

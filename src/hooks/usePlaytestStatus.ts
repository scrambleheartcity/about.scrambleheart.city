import { FeatureFlagsUrl } from '@/app/data';
import { useFetch } from './useFetch';
import { useQueryParam } from './useQueryParam';

type DbFeatureFlags = {
  playtest?: boolean;
  playtest_visible?: boolean;
};

export function usePlaytestStatus() {
  const forceActive = useQueryParam('access');
  const featureFlagsStr = useFetch(
    `${FeatureFlagsUrl}?cacheBust=${new Date().getTime()}`,
  );
  const featureFlags: DbFeatureFlags | null = featureFlagsStr
    ? JSON.parse(featureFlagsStr)
    : null;
  const playtestActive: boolean =
    forceActive === 'false'
      ? false
      : forceActive === 'true'
      ? true
      : featureFlags
      ? !!featureFlags.playtest && !!featureFlags.playtest_visible
      : false;
  return playtestActive;
}

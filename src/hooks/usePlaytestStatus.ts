import { FeatureFlagsUrl } from '@/app/data';
import { useFetch } from './useFetch';
import { useQueryParam } from './useQueryParam';

export function usePlaytestStatus() {
  const forceActive = useQueryParam('access');
  const featureFlags = useFetch(
    `${FeatureFlagsUrl}?cacheBust=${new Date().getTime()}`,
  );
  const playtestActive: boolean =
    forceActive === 'false'
      ? false
      : forceActive === 'true'
      ? true
      : featureFlags
      ? !!JSON.parse(featureFlags).playtest
      : false;
  return playtestActive;
}

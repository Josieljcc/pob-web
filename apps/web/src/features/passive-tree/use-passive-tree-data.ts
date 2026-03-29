import { useQuery } from '@tanstack/react-query';

import { DEFAULT_PASSIVE_TREE_VERSION } from '@pob-web/domain';
import { fetchPassiveTreeDataForVersion } from '@pob-web/infrastructure';

export function usePassiveTreeData(
  version: string = DEFAULT_PASSIVE_TREE_VERSION
) {
  return useQuery({
    queryKey: ['passive-tree', 'data', version],
    queryFn: () => fetchPassiveTreeDataForVersion(version)
  });
}

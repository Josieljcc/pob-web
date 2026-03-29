import { createDefaultBuild } from '@pob-web/domain';

export function application(): string {
  const build = createDefaultBuild();
  return `application:${build.targetVersion}`;
}

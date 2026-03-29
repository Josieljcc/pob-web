import { domain } from '@pob-web/domain';

export function application(): string {
  return `application:${domain()}`;
}

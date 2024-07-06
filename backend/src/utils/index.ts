import * as crypto from 'crypto';
export function md5(password: string) {
  const hash = crypto.createHash('md5');
  hash.update(password);
  return hash.digest('hex');
}

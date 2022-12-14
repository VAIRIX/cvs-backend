import bcrypt from 'bcrypt';

const BCRYPT_HASH_ROUND = 10;

export const hash = (str: string): Promise<string> => {
  return bcrypt.hash(str, Number(BCRYPT_HASH_ROUND));
};

export const compare = (str: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(str, hash);
};

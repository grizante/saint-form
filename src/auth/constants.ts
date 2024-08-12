import { env } from 'process';

export const jwtConstants = {
  secret:
    env.JWT_CONSTANTS ||
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

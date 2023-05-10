import { User } from '@prisma/client';
import { Token } from './token.model';

export class Auth extends Token {
  user: User;
}

import { IContext } from './../../models';
import { objectType, extendType, nonNull, stringArg, arg } from 'nexus';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { APP_SECRET } from '../../utils/auth/auth';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  description: 'Model Auth payload',
  definition(t) {
    t.string('token', { description: 'JWT token' });
    t.field('user', {
      type: 'User',
      description: 'User data',
    });
  },
});

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg({ description: 'Unique email' })),
        password: nonNull(stringArg({ description: 'User password' })),
      },
      async resolve(parent, args, context: IContext) {
        const user = await context.prisma.user.findUnique({
          where: {
            email: args.email,
          },
        });

        if (!user) {
          throw new Error('No such user found');
        }

        const isValid = await compare(args.password, user.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        const token = sign({ userId: user.id }, APP_SECRET);

        return {
          token,
          user,
        };
      },
    });

    t.nonNull.field('singup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg({ description: 'Unique email' })),
        password: nonNull(stringArg({ description: 'User password' })),
        name: nonNull(stringArg({ description: 'User name' })),
      },
      async resolve(parent, args, context: IContext) {
        // const { email, name } = args;

        const password = await hash(args.password, 10);

        const user = await context.prisma.user.create({ data: { ...args, password } });

        const token = sign({ userId: user.id }, APP_SECRET);

        return {
          token,
          user,
        };
      },
    });
  },
});

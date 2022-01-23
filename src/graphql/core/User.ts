import { IContext } from './../../models';
import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  description: 'User model',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.string('email');

    t.nonNull.list.nonNull.field('links', {
      type: 'Link',
      description: 'List links',
      resolve(parent, args, context: IContext) {
        return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
      },
    });

    t.nonNull.list.nonNull.field('votes', {
      type: 'Link',
      resolve(parent, args, context: IContext) {
        return context.prisma.user.findUnique({ where: { id: parent.id } }).votes();
      },
    });
  },
});

import { extendType, nonNull, objectType, stringArg, intArg } from 'nexus';
import { IContext } from '../context';

export const Link = objectType({
  name: 'Link', // <- Name of your type
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
  },
});

// #region Link Query's
export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve(parent, args, context: IContext, info) {
        return context.prisma.link.findMany();
      },
    });
  },
});

export const LinkByIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('link', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context: IContext, info) {
        const { id } = args;
        const link = context.prisma.link.findUnique({
          where: {
            id,
          },
        });
        return link;
      },
    });
  },
});

// #endregion

// #region Link Mutation's
export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context: IContext, info) {
        const { url, description } = args;

        const newLink = context.prisma.link.create({
          data: {
            ...args,
          },
        });

        return newLink;
      },
    });
  },
});

export const LinkUpdateMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context: IContext, info) {
        const { id, url, description } = args;

        const updateLink = context.prisma.link.update({
          where: {
            id,
          },
          data: {
            url,
            description,
          },
        });

        return updateLink;
      },
    });
  },
});

export const LinkDeleteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context: IContext, info) {
        const { id } = args;

        const deletedLink = context.prisma.link.delete({
          where: {
            id,
          },
        });

        return deletedLink;
      },
    });
  },
});
// #endregion

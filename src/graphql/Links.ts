import { extendType, nonNull, objectType, stringArg, intArg } from 'nexus';
import { IContext } from '../context';

export const Link = objectType({
  name: 'Link',
  description: 'Model link',
  definition(t) {
    t.nonNull.int('id', { description: 'Id link' });
    t.nonNull.string('description', { description: 'Description link' });
    t.nonNull.string('url', { description: 'Url link' });
    t.field('postedBy', {
      type: 'User',
      description: 'Posted By',
      resolve(parent, args, context: IContext) {
        return context.prisma.link
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .postedBy();
      },
    });
  },
});

// #region Link Query's
export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      description: 'Links type',
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
        const { userId } = context;

        if (!userId) {
          throw new Error('Can´t pot wothout logging in.');
        }

        const newLink = context.prisma.link.create({
          data: {
            description,
            url,
            postedBy: { connect: { id: userId } },
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

import { Prisma } from '@prisma/client';
import {
  extendType,
  nonNull,
  objectType,
  stringArg,
  intArg,
  inputObjectType,
  enumType,
  list,
  arg,
} from 'nexus';
import { IContext } from './../../models';

export const Link = objectType({
  name: 'Link',
  description: 'Model link',
  definition(t) {
    t.nonNull.int('id', { description: 'Id link' });
    t.nonNull.string('description', { description: 'Description link' });
    t.nonNull.string('url', { description: 'Url link' });
    t.nonNull.dateTime('createdAt', { description: 'Create at' });

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

    t.nonNull.list.nonNull.field('voters', {
      type: 'User',
      resolve(parent, args, context: IContext) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .voters();
      },
    });
  },
});

/** Represent the criterial by wich that the list of Link elements can be sorted */
export const LinkOrderByInput = inputObjectType({
  name: 'LinkOrderByInput',
  description: 'Input to element sorting, acording to specific criterial',
  definition(t) {
    t.field('description', {
      type: Sort,
      description: 'Sort option by description field [asc/desc]',
    });
    t.field('url', {
      type: Sort,
      description: 'Sort option by url field [asc/desc]',
    });
    t.field('createdAt', { type: Sort, description: 'Created at' });
  },
});

export const Sort = enumType({
  name: 'Sort',
  members: ['asc', 'desc'],
});

export const Feed = objectType({
  name: 'Feed',
  description: 'Feed type use as return type of the feed query',
  definition(t) {
    t.nonNull.list.nonNull.field('links', {
      type: Link,
      description: 'Array of link type objects',
    });
    t.nonNull.int('count', {
      description:
        'Is an integer that will mention number of links available in the database that match',
    });
  },
});

// #region Link Query's
export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('feed', {
      type: 'Feed',
      description: 'Links type',
      args: {
        filter: stringArg({
          description: 'Serarch string on fields URL or Description',
        }),
        skip: intArg({ description: 'Offset pagination use' }),
        take: intArg({
          description: 'Select a limit range and return records',
        }),
        orderBy: arg({
          type: list(nonNull(LinkOrderByInput)),
          description:
            'Represent the criterial by wich that the list of Link elements can be sorted',
        }),
      },
      async resolve(parent, args, context: IContext, info) {
        const where = args.filter
          ? {
              OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } },
              ],
            }
          : {};

        /** In prisma undefinend means do nothing, null is a specific value. */
        const links = await context.prisma.link.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
          orderBy: args?.orderBy as
            | Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput>
            | undefined,
        });
        const count = await context.prisma.link.count({ where });

        return {
          links,
          count,
        };
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

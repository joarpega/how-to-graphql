import { graphql } from 'graphql';
import { extendType, nonNull, objectType, stringArg, intArg } from 'nexus';
import { NexusGenObjects } from './../../nexus-typegen';

export const Link = objectType({
  name: 'Link', // <- Name of your type
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
  },
});

let links: NexusGenObjects['Link'][] = [
  {
    id: 1,
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
  {
    id: 2,
    url: 'graphql.org',
    description: 'GraphQL official website',
  },
];

// #region Link Query's
export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve(parent, args, context, info) {
        return links;
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
      resolve(parent, args, context, info) {
        const { id } = args;
        const isFound = links.find((element) => element.id === id);
        const resp = isFound ? isFound : null; // { id: 0, url: '', description: ''} as NexusGenObjects['Link'];
        return resp;
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

      resolve(parent, args, context, info) {
        const { url, description } = args;

        let idCount = links.length + 1;

        const link: NexusGenObjects['Link'] = {
          id: idCount,
          url,
          description,
        };
        links.push(link);
        return link;
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
      resolve(parent, args, context, info) {
        const { id } = args;

        let response = null;

        links.forEach((el) => {
          if (el.id === id) {
            el = { ...args };
            response = el;
          }
        });

        return response;
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
      resolve(parent, args, context, info) {
        const { id } = args;

        const index = links.findIndex((el) => el.id === id);
        let response = null;
        
        if (index >= 0) {
          response = links[index]
          links.splice(index, 1);
        }

        return response;
      },
    });
  },
});
// #endregion

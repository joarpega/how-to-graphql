FROM node:16.13.2 as builder

COPY ["package.json","package-lock.json", "/usr/src/app/"]

WORKDIR /usr/src/app

RUN ["npm", "install"]

COPY [".", "/usr/src/app"]

RUN ["npm", "run", "build"]

FROM node:16.13.2

COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/package-lock.json .
COPY --from=builder /usr/src/app/node_modules/ ./node_modules
COPY --from=builder /usr/src/app/dist/ ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]

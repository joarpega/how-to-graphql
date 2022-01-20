# Example GraphQL API

1. Install dependencies

```bash
npm install --save-dev typescript ts-node-dev
touch tsconfig.json  
```

2. Edit `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "lib": [
      "esnext"
    ],
    "strict": true,
    "rootDir": ".",
    "outDir": "dist",
    "sourceMap": true,
    "esModuleInterop": true
  }
}
```

3. Install Apollo Server, GraphQL and Nexus
```bash
npm install apollo-server graphql nexus
```


Step: Implementing the signup and login mutation

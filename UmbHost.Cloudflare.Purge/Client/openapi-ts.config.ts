import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://localhost:44383/umbraco/swagger/umbhostcloudflarepurge/swagger.json',
  output: 'src/backend-api',
  //format : false,
  //enums : 'javascript', // Typescript not recommended https://heyapi.vercel.app/openapi-ts/configuration.html#enums
  schemas : false,
  //lint : false,
  //debug: true,
  services: {
    name: '{{name}}Resource'
  }
});
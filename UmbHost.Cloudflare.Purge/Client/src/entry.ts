import type { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { registerManifest } from './bundle.manifests.js';
import { OpenAPI } from './backend-api/index.js';

export const onInit: UmbEntryPointOnInit = (host, extensionRegistry) => {

  host.consumeContext(UMB_AUTH_CONTEXT, (auth) => {
      if (!auth) return;

      const config = auth.getOpenApiConfiguration();

      OpenAPI.BASE = config.base ?? '';
      OpenAPI.CREDENTIALS = config.credentials ?? 'same-origin';
      OpenAPI.WITH_CREDENTIALS = config.credentials === 'include';
      OpenAPI.TOKEN = async () => (await config.token()) ?? '';

  });

  registerManifest(extensionRegistry);

};
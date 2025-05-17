using UmbHost.Cloudflare.Purge.Migrations;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Migrations;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Migrations.Upgrade;

namespace UmbHost.Cloudflare.Purge.NotificationHandlers.UserGroups
{
    internal class RunUmbHostCloudflarePurgeUserGroupMigration : INotificationHandler<UmbracoApplicationStartingNotification>
    {
        private readonly IMigrationPlanExecutor _migrationPlanExecutor;
        private readonly ICoreScopeProvider _coreScopeProvider;
        private readonly IKeyValueService _keyValueService;
        private readonly IRuntimeState _runtimeState;

        public RunUmbHostCloudflarePurgeUserGroupMigration(IMigrationPlanExecutor migrationPlanExecutor, ICoreScopeProvider coreScopeProvider, IKeyValueService keyValueService, IRuntimeState runtimeState)
        {
            _migrationPlanExecutor = migrationPlanExecutor;
            _coreScopeProvider = coreScopeProvider;
            _keyValueService = keyValueService;
            _runtimeState = runtimeState;
        }

        public void Handle(UmbracoApplicationStartingNotification notification)
        {
            if (_runtimeState.Level < RuntimeLevel.Run)
            {
                return;
            }

            var migrationPlan = new MigrationPlan("UmbHostCloudflarePurgeUserGroup");
            migrationPlan.From(string.Empty)
                .To<AddUmbHostCloudflarePurgeUserGroup>("f0c06cf3-1860-4b02-9bdb-9d45aa355770");

            var upgrader = new Upgrader(migrationPlan);
            upgrader.Execute(
                _migrationPlanExecutor,
                _coreScopeProvider,
                _keyValueService);
        }
    }
}

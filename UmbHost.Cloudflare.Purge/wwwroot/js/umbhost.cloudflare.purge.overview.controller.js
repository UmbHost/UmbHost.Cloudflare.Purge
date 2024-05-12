function UmbHostCloudflarePurgeOverview($scope, editorService, $routeParams, notificationsService, formHelper, localizationService, overlayService, UmbHostCloudflarePurgeResources) {
    var vm = this;
    localizationService.localize("umbhostCloudflarePurge_overviewtitle").then(function (overviewTitle) {
        vm.overviewTitle = overviewTitle;
    });
};
angular.module("umbraco").controller("UmbHost.Cloudflare.Purge.Overview.Controller", UmbHostCloudflarePurgeOverview);
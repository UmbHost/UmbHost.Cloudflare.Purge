function UmbHostCloudflarePurgeTree($scope, editorService, $routeParams, notificationsService, navigationService, formHelper, localizationService, overlayService, UmbHostCloudflarePurgeResources) {
    var vm = this;

    vm.success = false;
    vm.close = close;
    vm.source = $scope.currentNode;
    vm.introduction = '';
    vm.busy = false;

    localizationService.localize("umbhostCloudflarePurge_introductionTree").then(function (introductionTree) {
        vm.introduction = introductionTree.replace("[[PAGENAME]]", $scope.currentNode.name);
    });

    vm.customPurgeButtonState = "init";
    vm.customPurge = customPurge;

    function close() {
        navigationService.hideDialog();
    }

    function customPurge() {

        vm.customPurgeButtonState = "busy";
        vm.busy = true;
        localizationService.localize("umbhostCloudflarePurge_confirmcustompurgetitle").then(function (confirmcustompurge) {
            localizationService.localize("umbhostCloudflarePurge_confirmcustompurgecontent").then(function (confirmcustompurgecontent) {
                var options = {
                    title: confirmcustompurge,
                    content: confirmcustompurgecontent,
                    disableBackdropClick: true,
                    disableEscKey: true,
                    confirmType: 'delete',
                    submitButtonLabelKey: 'umbhostCloudflarePurge_custompurge',
                    submit: function () {
                        UmbHostCloudflarePurgeResources.Node($scope.currentNode.id)
                            .then(function (response) {

                                vm.customPurgeButtonState = "success";
                                localizationService.localize("umbhostCloudflarePurge_PurgeSuccessTitle").then(function (title) {
                                    localizationService.localize("umbhostCloudflarePurge_PurgeSuccessValue").then(function (value) {
                                        notificationsService.success(title, value);
                                    });
                                });

                                vm.success = true;
                                overlayService.close();
                            })
                            .catch(function (response) {
                                localizationService.localize("umbhostCloudflarePurge_Z0Title").then(function (title) {
                                    localizationService.localize("umbhostCloudflarePurge_Z0Value").then(function (value) {
                                        notificationsService.error(title, value);
                                    });
                                });

                                overlayService.close();
                                vm.customPurgeButtonState = "error";
                                vm.busy = false;
                            });
                    },
                    close: function () {
                        overlayService.close();
                        vm.customPurgeButtonState = "error";
                        vm.busy = false;
                    }
                };

                overlayService.confirm(options);
            });
        });
    }
}
angular.module("umbraco").controller("UmbHost.Cloudflare.Purge.Tree.Controller", UmbHostCloudflarePurgeTree);
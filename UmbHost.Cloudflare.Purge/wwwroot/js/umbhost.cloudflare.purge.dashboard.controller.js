function UmbHostCloudflarePurgeDashboard(notificationsService, localizationService, overlayService, UmbHostCloudflarePurgeResources) {
    var vm = this;
    vm.customPurgeButtonState = "init";
    vm.purgeButtonState = "init";
    vm.cdnurls = '';
    vm.cdnUrlsCount = 0;
    vm.redClass = '';

    vm.customPurge = customPurge;
    vm.purgeEverything = purgeEverything;
    vm.updateLineCount = updateLineCount;

    function updateLineCount() {
        var lines = vm.cdnurls.split("\n");
        vm.cdnUrlsCount = lines.length;

        if (vm.cdnUrlsCount > 30) {
            vm.redClass = "red bold";
        } else {
            vm.redClass = '';
        }
    }

    function purgeEverything() {

        vm.purgeButtonState = "busy";
        localizationService.localize("umbhostCloudflarePurge_confirmpurgeeverythingtitle").then(function (confirmpurgeeverything) {
            localizationService.localize("umbhostCloudflarePurge_confirmpurgeeverythingcontent").then(function (confirmpurgeeverythingcontent) {
                var options = {
                    title: confirmpurgeeverything,
                    content: confirmpurgeeverythingcontent,
                    disableBackdropClick: true,
                    disableEscKey: true,
                    confirmType: 'delete',
                    submitButtonLabelKey: 'umbhostCloudflarePurge_purgeeverything',
                    submit: function () {
                        UmbHostCloudflarePurgeResources.purgeAll()
                            .then(function (response) {

                                vm.purgeButtonState = "success";
                                localizationService.localize("umbhostCloudflarePurge_PurgeSuccessTitle").then(function (title) {
                                    localizationService.localize("umbhostCloudflarePurge_PurgeSuccessValue").then(function (value) {
                                        notificationsService.success(title, value);
                                    });
                                });

                                overlayService.close();
                            })
                            .catch(function (response) {

                                if (response.data === "D1") {
                                    localizationService.localize("umbhostCloudflarePurge_GeneralErrorTitle").then(function (title) {
                                        localizationService.localize("umbhostCloudflarePurge_D1Value").then(function (value) {
                                            notificationsService.error(title, value);
                                        });
                                    });
                                } else {
                                    localizationService.localize("umbhostCloudflarePurge_GeneralErrorTitle").then(function (title) {
                                        localizationService.localize("umbhostCloudflarePurge_GeneralErrorValue").then(function (value) {
                                            notificationsService.error(title, value);
                                        });
                                    });
                                }

                                overlayService.close();
                                vm.purgeButtonState = "error";
                            });
                    },
                    close: function () {
                        overlayService.close();
                        vm.purgeButtonState = "error";
                    }
                };

                overlayService.confirm(options);
            });
        });
    }

    function customPurge() {

        vm.customPurgeButtonState = "busy";
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
                        UmbHostCloudflarePurgeResources.Custom(vm.cdnurls.split("\n"))
                            .then(function (response) {

                                vm.customPurgeButtonState = "success";
                                localizationService.localize("umbhostCloudflarePurge_PurgeSuccessTitle").then(function (title) {
                                    localizationService.localize("umbhostCloudflarePurge_PurgeSuccessValue").then(function (value) {
                                        notificationsService.success(title, value);
                                    });
                                });

                                overlayService.close();
                            })
                            .catch(function (response) {

                                if (response.data === "D1") {
                                    localizationService.localize("umbhostCloudflarePurge_GeneralErrorTitle").then(function (title) {
                                        localizationService.localize("umbhostCloudflarePurge_D1Value").then(function (value) {
                                            notificationsService.error(title, value);
                                        });
                                    });
                                } else {
                                    localizationService.localize("umbhostCloudflarePurge_Z0Title").then(function (title) {
                                        localizationService.localize("umbhostCloudflarePurge_Z0Value").then(function (value) {
                                            notificationsService.error(title, value);
                                        });
                                    });
                                }

                                overlayService.close();
                                vm.customPurgeButtonState = "error";
                            });
                    },
                    close: function () {
                        overlayService.close();
                        vm.customPurgeButtonState = "error";
                    }
                };

                overlayService.confirm(options);
            });
        });
    }
}
angular.module("umbraco").controller("UmbHost.Cloudflare.Purge.Dashboard.Controller", UmbHostCloudflarePurgeDashboard);
function UmbHostCloudflarePurgeDashboard($scope, editorService, $routeParams, notificationsService, formHelper, localizationService, overlayService) {
    var vm = this;
    vm.buttonState = "init";
    vm.purgeButtonState = "init";
    vm.cdnurls = '';

    vm.clickButton = clickButton;
    vm.purgeEverything = purgeEverything;

    //vm.onConfirm = function () {
    //    alert('Confirm clicked');
    //};

    //vm.onCancel = function () {
    //    alert('Cancel clicked');
    //}


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
                    overlayService.close();
                    vm.purgeButtonState = "success";
                },
                close: function () {
                    overlayService.close();
                    vm.purgeButtonState = "error";
                }
            };

                overlayService.confirm(options);
            });
        });
        //myService.clickButton().then(function () {
        //    vm.buttonState = "success";
        //    overlayService.open();
        //}, function () {
        //    vm.buttonState = "error";
        //});

    }

    function clickButton() {

        vm.buttonState = "busy";
        var options = {
            title: 'Simple Confirm',
            content: 'Are you sure you want to?',
            disableBackdropClick: true,
            disableEscKey: true,
            confirmType: 'delete',
            submit: function () {
                overlayService.close();
            }
        };

        overlayService.confirm(options);
        //myService.clickButton().then(function () {
        //    vm.buttonState = "success";
        //    overlayService.open();
        //}, function () {
        //    vm.buttonState = "error";
        //});

    }
}
angular.module("umbraco").controller("UmbHost.Cloudflare.Purge.Dashboard.Controller", UmbHostCloudflarePurgeDashboard);
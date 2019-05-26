"use strict";

app.component("farbItem", {
    templateUrl: "components/farb-item.html",
    controller: "FarbItemController",
    bindings: {
        farbe: "<",
        index: "<"
    }
});

app.controller("FarbItemController", function ($log, Farbe) {

    this.$onInit = function () {
        this.farbeInHex = this.farbe.hexWert();
    };

});
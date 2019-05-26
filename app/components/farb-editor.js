"use strict";

app.component("farbEditor", {
    templateUrl: "components/farb-editor.html",
    controller: "FarbEditorController",
    bindings: {}
});


app.config(function ($stateProvider) {
    $stateProvider.state({
        name: "farb-editor",
        component: "farbEditor",
        params: {
            farbe: null
        }
    });

});


app.controller("FarbEditorController", function ($log, Farbe, $stateParams, $http) {

    this.$onInit = function () {
        this.farbe = $stateParams.farbe;
        this.localHexWert = this.farbe.hexWert();
        this.red = this.farbe.rot;
        this.green = this.farbe.gruen;
        this.blue = this.farbe.blau;
    };

    this.saveColor = () => {
        let red = this.red;
        let green = this.green;
        let blue = this.blue;
        let name = this.name;

        $http.patch("http://localhost:8081/api/colours/" + this.farbe.index,
            {
                "title": name,
                "red": red,
                "green": green,
                "blue": blue
            })
            .then(response => {
                this.error = "";
                this.success = "Success!";
            })
            .catch(response => {
                this.success = "";
                $log.debug(response);
                this.error = "Error: " + response;
            });
    };

    this.farbAnpassung = () => {
        this.localHexWert = this.hexWert();
    };

    this.hex = (wert) => {
        return angular.isNumber(wert)
            ? ("0" + wert.toString(16)).substr(-2)
            : "??";
    };

    this.hexWert = () => {
        return ("#" + this.hex(this.red) + this.hex(this.green) + this.hex(this.blue)).toUpperCase();
    };



});
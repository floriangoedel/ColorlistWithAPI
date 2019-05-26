"use strict";

app.factory("Farbe", function () {


    function Farbe(name, rot, gruen, blau, index) {
        this.name = name;
        this.rot = rot;
        this.gruen = gruen;
        this.blau = blau;
        this.index = index;

        function hex(wert) {
            return angular.isNumber(wert)
                ? ("0" + wert.toString(16)).substr(-2)
                : "??";
        }

        this.hexWert = () => {
            return ("#" + hex(this.rot) + hex(this.gruen) + hex(this.blau)).toUpperCase();
        };

        this.helligkeit = () => {
            return (0.2126*this.rot + 0.7152*this.gruen + 0.0722*this.blau);
        };

    }

    return Farbe;
});

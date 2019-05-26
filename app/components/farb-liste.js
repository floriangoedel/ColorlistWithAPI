"use strict";

app.component("farbListe", {
    templateUrl: "components/farb-liste.html",
    controller: "FarbListeController",
    bindings: {}
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        url: "/farbliste",
        name: "farb-liste",
        component: "farbListe"
    });

    $urlRouterProvider.otherwise("/farbliste");
});


app.controller("FarbListeController", function ($log, $http, Farbe) {

    this.$onInit = function () {
        this.farbliste = [];
        this.sortingMenueItems = ['Title', 'Red', 'Green', 'Blue', 'Hue', 'Saturation', 'Value'];

        $http.get("http://localhost:8081/colours")
            .then(response => {
                let farbArray = response.data;
                let index = 2;
                for (let farbe of farbArray) {
                    this.farbliste.push(new Farbe(farbe.title, farbe.red, farbe.green, farbe.blue, index));
                    index++;
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    this.sortList = (index) => {
        $http.get("http://localhost:8081/colours?sort=" + this.sortingMenueItems[index])
            .then(response => {
                this.farbliste = [];
                let farbArray = response.data;
                for (let farbe of farbArray) {
                    this.farbliste.push(new Farbe(farbe.title, farbe.red, farbe.green, farbe.blue));
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    this.search = () => {
        $http.get("http://localhost:8081/colours?title=" + this.searchbar)
            .then(response => {
                this.farbliste = [];
                let farbArray = response.data;
                for (let farbe of farbArray) {
                    this.farbliste.push(new Farbe(farbe.title, farbe.red, farbe.green, farbe.blue));
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

});
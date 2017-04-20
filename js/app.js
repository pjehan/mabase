$(document).ready(function() {

    var serverIP = "10.1.106.4";
    var serverPort = "8080";
    var serverURL = "http://" + serverIP + ":" + serverPort;

    // DOM Elements
    var $personnes = $("#personnes tbody");

    $.ajax({
        method: "GET",
        url: serverURL + "/personne"
    })
    .done(function(data) {
        console.log(data)
        var trTemplate = $personnes.find("tr.hidden");

        data.forEach(function(personne) {
            var tr = trTemplate.clone();
            tr.removeClass("hidden");
            tr.find("td.firstname").text(personne.firstname);
            tr.find("td.lastname").text(personne.lastname);
            $personnes.append(tr);
        });
    });

});
$(document).ready(function() {

    var serverIP = "localhost";
    var serverPort = "8080";
    var serverURL = "http://" + serverIP + ":" + serverPort;

    // DOM Elements
    var $personnes = $("#personnes tbody");
    var $formPersonne = $("#form-personne");

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

    $formPersonne.submit(function(event) {
        event.preventDefault();

        var formMethod = $(this).attr("method");
        var formAction = $(this).attr("action");

        var firstname = $(this).find("input[name=firstname]").val();
        var lastname = $(this).find("input[name=lastname]").val();

        $.ajax({
            method: formMethod,
            url: serverURL + formAction,
            data: {
                firstname: firstname,
                lastname: lastname
            }
        })
        .done(function(){

        });
    });

});
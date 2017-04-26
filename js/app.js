$(document).ready(function() {

    // Server config
    var serverIP = "localhost";
    var serverPort = "8080";
    var serverURL = "http://" + serverIP + ":" + serverPort;

    // DOM Elements
    var $personnes = $("#personnes tbody");
    var $btnNewPerson = $("#btn-new-person");
    var $modalFormPerson = $('#modal-personne-form');
    var $editRow = null;

    // Insert new line in table
    function newPersonne(personne) {
        var tr = $personnes.find("tr.hidden").clone();
        tr.removeClass("hidden");
        tr.find("td.firstname").text(personne.firstname);
        tr.find("td.lastname").text(personne.lastname);
        tr.find("form").attr("action", serverURL + "/personne/" + personne.id);
        tr.find("a.edit-personne").attr("href", serverURL + "/personne/" + personne.id);
        $personnes.prepend(tr);
        tr.hide().fadeIn();
    }

    // Load data on start
    $.ajax({
        method: "GET",
        url: serverURL + "/personne"
    })
    .done(function(data) {
        data.forEach(function(personne) {
            newPersonne(personne);
        });
    });

    // Click button add person
    $btnNewPerson.click(function(event){
        event.preventDefault();
        $modalFormPerson.find(".modal-title").text("Nouvelle personne");
        $modalFormPerson.find("form").attr("action", "/personne");
        $modalFormPerson.find("form").attr("method", "POST");
        $modalFormPerson.find("form")[0].reset();
        $modalFormPerson.modal("show");
    });

    // Click button delete person
    $personnes.on("submit", "form", function(event){
        event.preventDefault();

        var self = this;

        var formMethod = $(this).attr("method");
        var formAction = $(this).attr("action");

        $.ajax({
            method: formMethod,
            url: formAction
        })
        .done(function(){
            $(self).closest("tr").fadeOut();
        });
    });

    // Click button edit person
    $personnes.on("click", "a.edit-personne", function(event) {
        event.preventDefault();

        var href = $(this).attr("href");
        $editRow = $(this).closest("tr");

        $.ajax({
            method: "GET",
            url: href
        })
        .done(function(personne) {
            $modalFormPerson.find(".modal-title").text("Modifier personne");
            $modalFormPerson.find("form").attr("action", "/personne/" + personne.id);
            $modalFormPerson.find("form").attr("method", "PUT");
            $modalFormPerson.find("form input[name=firstname]").val(personne.firstname);
            $modalFormPerson.find("form input[name=lastname]").val(personne.lastname);
            $modalFormPerson.modal("show");
        });
    });

    // Submit edit or create person form
    $modalFormPerson.find("form").submit(function(event) {
        event.preventDefault();

        var self = this;

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
        .done(function(personne){
            if (formMethod == "POST") {
                newPersonne(personne);
            } else {
                $editRow.find(".firstname").text(personne.firstname);
                $editRow.find(".lastname").text(personne.lastname);
                $editRow.addClass("animated flipInX");
                setTimeout(function(){$editRow.removeClass("animated flipInX")}, 2000);
            }
            self.reset();
            $modalFormPerson.modal("hide");
        });
    });

});
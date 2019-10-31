console.log("unicorns are here!", $);

(function() {
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    //////////////////////////only change code below this line///////////////////////////////////


    var username, password, userToGo;
    var baseUrl = "https://api.github.com";

    //// GO BUTTON ////

    $("#go-button").on("click", function() {
        username = $('input[name="username"]').val();
        password = $('input[name="password"]').val();
        userToGo = $('input[name="user-to-go"]').val();
        var endPoint = "/users/" + userToGo + "/repos";

        $.ajax({
            url: baseUrl + endPoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            success: function(data) {
                console.log(data);
                var repos = Handlebars.templates.repos({
                    repos: data
                });
                $("#results-container").html(repos);
            },

            error: function(err) {
                console.log(err);
            }
        });
    });

    //// COMMITS ////

    $("#results-container").on("click",".results", function (e){
        var endPoint = "/repos/"+ $(e.target).text().trim() + "/commits";

        $.ajax({
            url: baseUrl + endPoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },

            success: function(data) {
                console.log(data);
                var commits = Handlebars.templates.commits({
                    commits: data.slice(0,10)
                });
                $(e.target).append(commits);

            },

            error: function(err) {
                console.log(err);

            }
        });

    });

})();

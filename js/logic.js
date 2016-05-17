(function($) {
    $(function() {
        var domain = "https://en.wikipedia.org";
        var queryString = "/w/api.php?action=query&format=json&prop=extracts%7Cinfo&continue=&generator=search&redirects=1&exsentences=2&exlimit=20&exintro=1&explaintext=1&inprop=url&gsrnamespace=0&gsrlimit=20&gsrsearch=";
        var randomQuery = '/w/api.php?action=query&format=json&prop=extracts%7Cinfo&meta=&generator=random&redirects=1&exsentences=2&exlimit=20&exintro=1&explaintext=1&inprop=url&grnnamespace=0&grnlimit=20';
        var $inputDOM = $('input');

        var $searchContainer = $("#search-container");
        $searchContainer.addClass('hide-content');
        $searchContainer.animate({opacity: 1}, 1500);

        function fetchArticles(event, searchString) {
            $.ajax({
                url: domain + queryString + searchString,
                cache: false,
                dataType: 'jsonp',
                type: 'GET',
                success: function(response) {
                    var articles = response.query !== undefined ? response.query.pages : null;

                    $('#results-container').html("");

                    if (articles !== null) {
                        for(var article in articles) {
                            $('#results-container').append('<div class="row"><a href=\"' + articles[article].fullurl + '\" target="_blank"><div class="col-md-8 col-md-offset-2 results-styling">' 
                                    + '<h2>' + articles[article].title + '</h2>' 
                                    + '<br />' 
                                    + '<p>' + articles[article].extract + '</p>'
                                    + '</div></a></div>');
                        }
                    } else {
                        $('#results-container').append('<div class="row"><div class="col-md-8 col-md-offset-2 results-styling">' 
                                    + '<p style="font-size:2em;">Sorry, your search could not be completed.</p>'
                                    + '</div></div>');
                    }    
                },
                error: function(jqXHR, errorString) {
                    $('#results-container').html("").append('<div class="row"><div class="col-md-8 col-md-offset-2 results-styling">' 
                                    + '<p style="font-size:2rem;">Sorry, your search could not be completed.</p>'
                                    + '<p style="font-size:1.5rem;">Reason:' + errorString + '</p>'
                                    + '</div></div>');
                }
            });
        }

        $inputDOM.on('keyup', function(event) {
            //event.preventDefault();

            var keycode = event.keyCode;
            //console.log(event.type + ': ' + keycode);

            if (keycode === 13) {
                fetchArticles(event, $inputDOM.val());
            }
        });

        $("#search-button").on('click', function(event) {
            fetchArticles(event, $inputDOM.val());
        });

        $('#random-button').on('click', function(event) {
            $.ajax({
                url: domain + randomQuery,
                cache: false,
                dataType: 'jsonp',
                type: 'GET',
                success: function(response) {
                    var articles = response.query.pages;

                    $('#results-container').html("");

                    for(var article in articles) {
                        $('#results-container').append('<div class="row"><a href=\"' + articles[article].fullurl + '\" target="_blank"><div class="col-md-8 col-md-offset-2 results-styling">' 
                                + '<h2>' + articles[article].title + '</h2>' 
                                + '<br />' 
                                + '<p>' + articles[article].extract + '</p>'
                                + '</div></a></div>');
                    }
                },
                error: function(jqXHR, errorString) {
                    $('#results-container').html("").append('<div class="row"><div class="col-md-8 col-md-offset-2 results-styling">' 
                                    + '<p style="font-size:2rem;">Sorry, your search could not be completed.</p>'
                                    + '<p style="font-size:1.5rem;">Reason:' + errorString + '</p>'
                                    + '</div></div>');
                }
            });
        })
    });
})(window.jQuery);



$(document).ready(function () {
    console.log('lol');

    function showLoading(show) {
        if (show) {
            $('#loading').removeClass('hidden');
        } else {
            $('#loading').addClass('hidden');
        }
    }

    $('input').keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $("form").submit();
        }
    });

    $('form').submit(function (event) {
        event.preventDefault();
        var inputFields = $('form :input').filter(function (index, element) {
            return element.name
        });
        var data = {};
        for (var i = 0; i < inputFields.length; ++i) {
            data[inputFields[i].name] = inputFields[i].value;
        }
        showLoading(true);
        $.ajax({
            url: "https://docs.google.com/forms/d/1xo34_2ipSfn-KMRrCzdTUSdFprYw1--GIGbjlQPGP6w/formResponse",
            data: data,
            type: "POST",
            dataType: "xml"
        }).always(function () {
            // not the best way to handle this... Better can be found here: http://stackoverflow.com/a/6169703/1035552
            console.log('always');
            //showLoading(false);
            $('#thanks').removeClass('hidden');
        });
    });

    $('#thanks button').on('click', function (event) {
        event.preventDefault();
        $('form').find('input, text').val('');
        $('#thanks').addClass('hidden');
        $('#loading').addClass('hidden');
    });
});
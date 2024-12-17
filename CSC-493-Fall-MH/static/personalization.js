$(document).ready(function () {
    // enlarge text size on main UI container
    $("#enlarge").click(function () {
        var currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gen-text-size"))
        var newSize = currentSize + 1
        $(":root").css("--gen-text-size", newSize + "px");
        localStorage.setItem("gen_text_size", newSize + "px");
    });

    // decrease text size on main UI container
    $("#smaller").click(function () {
        var currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gen-text-size"))
        var newSize = currentSize - 1
        $(":root").css("--gen-text-size", newSize + "px");
        localStorage.setItem("gen_text_size", newSize + "px");
    });

    // change background color on main UI container
    $("#change-color").click(function () {
        var currentColor = getComputedStyle(document.documentElement).getPropertyValue("--background-color");
        var colorList = ["#deebff", "#deffea", "#ffdede", "#fdffde", "#ffecde"];
        var newColor = colorList[Math.floor(Math.random() * colorList.length)];

        $(":root").css("--background-color", newColor);
        localStorage.setItem("background_color", newColor);
    });

    // connect toggle functions to respective checkboxes
    $('#pred_check').on('change', function () {
        var on_off = $('#pred_check').prop('checked');

        $.ajax({
            type: 'POST',
            url: '/pred_on_off',
            data: { 'predictions_on': on_off },
            success: function (data) {
                $('#predictions').css('display', data.predictions_on ? 'block' : 'none');
            },

        });
    });

    // toggle on/off text-to-speech using textbox
    $('#tts_check').on('change', function () {
        var on_off = $('#tts_check').prop('checked');

        $.ajax({
            type: 'POST',
            url: '/tts_on_off',
            data: { 'tts_on': on_off },
            success: function (data) {
                $('#tts').css('display', data.tts_on ? 'block' : 'none');
            },

        });
    });

});

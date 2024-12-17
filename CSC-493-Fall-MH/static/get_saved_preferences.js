// fetching saved personalization settings
$(document).ready(function () {
    var saved_text_size = localStorage.getItem("gen_text_size");
    var saved_bg_color = localStorage.getItem("background_color");

    if (saved_text_size)
        $(":root").css("--gen-text-size", saved_text_size);

    if (saved_bg_color)
        $(":root").css("--background-color", saved_bg_color);
    
});
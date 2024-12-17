function used_pred_word(pred_word) {
    $.ajax({
        type: "POST",
        url: "/refresh_predicted_words",
        data: { "pred_word": pred_word },
        success: function (data) {
            $('#pred_1').text(data.pred_word_1);
            $('#pred_2').text(data.pred_word_2);
            $('#pred_3').text(data.pred_word_3);
            $('#pred_4').text(data.pred_word_4);
            $('#user-prompt').val($('#user-prompt').val() + ' ' + pred_word);

        },
    });
}
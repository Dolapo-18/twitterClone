$("#postTextarea").keyup( event=> {
    const textbox = $(event.target);
    let textboxValue = textbox.val().trim();

    let submitButton = $("#submitPostButton");

    if (textboxValue == "") {
        submitButton.prop("disabled", true);
        return;
    }
    submitButton.prop("disabled", false)
})
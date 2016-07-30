(function(window, document, $, undefined) {
    var sel = $(".sidemenu-select");
    sel.on("change", function() {
        var val = $(this).val();
        window.location.href = val;
    })
}(window, document, $));

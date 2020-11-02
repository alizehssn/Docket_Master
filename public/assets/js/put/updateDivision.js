$(document).ready(function () {
  $("#update-division").on("click", (e) => {
    e.preventDefault();

    const id = $("#update-division").data("id");
    const division = $("#division").val().trim();
    const judgeFName = $("#judgeFName").val().trim();
    const judgeLName = $("#judgeLName").val().trim();
    const roomNumber = $("#roomNumber").val().trim();

    updateDivision = {
      division,
      judgeFName,
      judgeLName,
      roomNumber,
    };

    $.ajax("/api/divisions/" + id, {
      type: "PUT",
      data: updateDivision,
    }).then(() => {
      location.reload();
      alert(
        "You've updated the information for this Judge and Division in the database."
      );
    });
  });
});

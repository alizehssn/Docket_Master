$(document).ready(function () {
  $("#update-type").on("click", (e) => {
    e.preventDefault();

    const id = $("#update-type").data("id");
    const type = $("#type").val().trim();

    updatedType = {
      Field: type,
    };

    $.ajax("/api/types/"+id, {
      type: "PUT",
      data: updatedType,
    }).then(() => {
      location.reload();
      alert("You've updated classification of case in the database.");
    });
  });
});

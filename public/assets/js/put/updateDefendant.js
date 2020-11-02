$(document).ready(function () {
  $("#update-defendant").on("submit", (e) => {
    e.preventDefault();

    const id = $("#update-plaintiff").data("id");
    const defFName = $("#defendantFName").val().trim();
    const defLName = $("#defendantLName").val().trim();

    updatedDefendant = {
      FName: defFName,
      LName: defLName,
    };

    $.ajax("/api/defendants/" + id, {
      type: "PUT",
      data: updatedDefendant,
    }).then(() => {
      location.reload();
      alert("You've updated this Defendant in the database.");
    });
  });
});

$(document).ready(function () {
  $("#update-pAtty").on("click", (e) => {
    e.preventDefault();

    const id = $("#update-pAtty").data("id");
    const pAttyFName = $("#pAttyFName").val().trim();
    const pAttyLName = $("#pAttyLName").val().trim();
    const pAttyBarNo = $("#pAttyBarNo").val().trim();

    updatedPAtty = {
      FName: pAttyFName,
      LName: pAttyLName,
      barNumber: pAttyBarNo,
    };

    $.ajax("/api/plaintiff_attorneys/"+id, {
      type: "PUT",
      data: updatedPAtty,
    }).then(() => {
      location.reload();
      alert("You've updated this Plaintiff Attorney in the database.");
    });
  });
});

$(document).ready(function () {
  $("#update-dAtty").on("click", (e) => {
    e.preventDefault();

    const id = $("#update-dAtty").data("id");
    const dAttyFName = $("#dAttyFName").val().trim();
    const dAttyLName = $("#dAttyLName").val().trim();
    const dAttyBarNo = $("#dAttyBarNo").val().trim();

    updatedDAtty = {
      def_attorneyFName: dAttyFName,
      def_attorneyLName: dAttyLName,
      barNumber: dAttyBarNo,
    };

    $.ajax("/api/defense_attorneys" + id, {
      type: "PUT",
      data: updatedDAtty,
    }).then(() => {
      location.reload();
      alert("You've updated this Defense Attorney in the database.");
    });
  });
});

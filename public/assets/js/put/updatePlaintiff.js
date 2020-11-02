$(document).ready(function () {
  $("#update-plaintiff").on("click", (e) => {
    e.preventDefault();

    const id = $("#update-plaintiff").data("id");
    const plaintFName = $("#plaintiffFName").val().trim();
    const plaintLName = $("#plaintiffLName").val().trim();
console.log("this is the id  = ", id)
    updatedPlaintiff = {
      FName: plaintFName,
      LName: plaintLName,
    };

    $.ajax("/api/plaintiffs/" + id, {
      type: "PUT",
      data: updatedPlaintiff,
    }).then(() => {
      location.reload();
      alert("You've updated this Plaintiff in the database.");
    });
  });
});

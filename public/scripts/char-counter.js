$(document).ready(function () {
  console.log("ITS WORKINGGGG ITS WORKINGGG");

  const tweetarea = $("#tweet-text");
  let counter = $("#counter");

  tweetarea.on("input", () => {
    const numberCount = tweetarea.val().length;
    counterCount = 140 - numberCount;

    if (counterCount < 0) {
      counter.addClass("red");
    }

    if (counterCount >= 0) {
      counter.removeClass("red");
    }
    counter.val(counterCount);

    const formSubmit = $("#form-submit");
  formSubmit.submit(() => {
    counter.val(140);
  })
  });
});

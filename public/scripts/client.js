// function that renders the tweets and prepends them to html

const renderTweets = function (tweets) {
  const $tweetContainer = $("#tweets-container");
  for (let tweet of tweets) {
    const $tweetArr = createTweetElements(tweet);
    $tweetContainer.prepend($tweetArr);
  }
};

// escape function for subverting XSS attempts
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// function for creating tweet html structure
const createTweetElements = function (tweetData) {
  const divElement = `<article id="article-box">
  <header>
  <div class="tweet-box">
  <div class="avatar-name">
  <img id='avatar'src=${tweetData.user.avatars}></img>
  ${tweetData.user.name}
  </div>
  <div>
  ${tweetData.user.handle}
  </div>
  </div>
    </div class="avatar-name">
  </header>
  <section class="writing-container">
    <div>
    ${escape(tweetData.content.text)}
    </div>
    </section>
    <footer>
    <div class="icons">
    <div class="posted">${timeago.format(tweetData.created_at)}</div>
    
    <div>
    <i id='comment'class="fa-brands fa-font-awesome"></i>
    <i id='retweet'class="fa-solid fa-retweet"></i>
        <i id='heart'class="fa-solid fa-heart"></i>
        </div>
        </div>
        </footer>
        </article>`;
  return divElement;
};

// document ready jQuery & ajax
$(document).ready(function () {
  const loadTweets = function () {
    $.ajax("/tweets/", { method: "GET" }).then(function (tweet) {
      renderTweets(tweet);
      // ajax GETing prepended post
    });
  };

  loadTweets();
  // form submitting to tweets server
  const formSubmit = $("#form-submit");
  formSubmit.submit((event) => {
    event.preventDefault();
    console.log("button pressed");
    const tweetInput = $("#tweet-text");

    if (tweetInput.val().length > 140 || tweetInput.val().length <= 0) {
      const $newTweet = $(".new-tweet");
      // prepend error html

      const $errorMsg = '<div id="error-msg">INVALID CHARACTER AMOUNT</div>';
      $newTweet.prepend($errorMsg).fadeOut(4000);
    } else {
      $.post("/tweets/", formSubmit.serialize()).then(function (res) {
        const $tweetContainer = $("#tweets-container");
        const $tweetArr = createTweetElements(res);
        $tweetContainer.prepend($tweetArr);
      });
      // empty the text area
      tweetInput.val("");
    }
  });
});

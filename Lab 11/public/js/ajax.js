(function ($) {
  var $shows = $("#shows");
  var $show = $("#show");
  var $search = $("#search");
  var $home = $("#home");
  function checkData(data) {
    if (!data.language) {
      data.language = "N/A";
    }
    if (!data.rating || !data.rating.average) {
      data.rating = "N/A";
    } else data.rating = data.rating.average;
    if (!data.network || !data.network.name) {
      data.network = "N/A";
    } else data.network = data.network.name;
    if (!data.summary) {
      data.summary = "N/A";
    }
    if (!data.genre) {
      data.genre = "N/A";
    }
    if (!data.image || !data.image.medium) {
      data.image = "/public/no_image.jpeg";
    } else data.image = data.image.medium;
    return data;
  }

  function getShow(e, id) {
    e.preventDefault();
    $.ajax({
      method: "GET",
      url: "http://api.tvmaze.com/shows/" + id,
    }).then((res) => {
      let data = checkData(res);
      let HLTMtemplate =
        "<div><h1>" +
        data.name +
        "</h1> <img src=" +
        data.image +
        "><dl><dt>Language</dt><dd>" +
        data.language +
        "</dd><dt>Genre</dt><dd><ul>{{#each genres}}<li>{{this}}</li>{{/each}}</ul></dd><dt>Average Rating</dt><dd>" +
        data.rating +
        "</dd><dt>Network</dt><dd>" +
        data.network +
        "</dd><dt>Summary</dt><dd>" +
        data.summary +
        " </dd></dl></div>";
      var template = Handlebars.compile(HLTMtemplate);
      var html = template(res);
      $show.html(html);
      $show.show();
      $shows.hide();
      $home.show();
    });
  }
  $.ajax({
    type: "GET",
    url: "http://api.tvmaze.com/shows",
  }).then((res) => {
    res.forEach((data) => {
      var list = $("<li>");
      var a = $("<a id=" + data.id + " href=" + data.url + " >");
      a.text(data.name);
      a.on("click", (event) => {
        getShow(event, data.id);
      });
      list.append(a);
      $shows.append(list);
    });
  });

  $search.submit(function (e) {
    e.preventDefault();
    var inputVal = $("input[name=searchTerm]").val();
    if (inputVal === undefined || inputVal === "" || inputVal === null) {
      throw "No value provided";
    }
    if (inputVal) {
      $shows.empty();
      $.ajax({
        method: "GET",
        url: "http://api.tvmaze.com/search/shows?q=" + inputVal,
      }).then((res) => {
        $shows.hide();
        res.forEach((data) => {
          var list = $("<li>");
          var a = $("<a id=" + data.show.id + " href=" + data.show.url + " >");
          a.text(data.show.name);
          a.on("click", (event) => {
            getShow(event, data.show.id);
          });
          list.append(a);
          $shows.append(list);
        });
        $shows.show();
        $home.show();
        $show.hide();
      });
    }
  });
})(window.jQuery);

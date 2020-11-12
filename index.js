const {
  input,
  div,
  text,
  script,
  domReady,
  textarea,
  style,
} = require("@saltcorn/markup/tags");

const headers = [
  {
    script:
      "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js",
  },
  {
    css:
      "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css",
  },
];

const Summernote = {
  type: "HTML",
  isEdit: true,
  run: (nm, v, attrs, cls) =>
    div(
      {
        class: [cls],
      },
      textarea(
        {
          name: text(nm),
          id: `input${text(nm)}`,
          rows: 10,
        },
        v || ""
      ),
      script(
        domReady(`$('#input${text(nm)}').summernote({
          height:150,
          callbacks: {
            onImageUpload: function(files) {
              data = new FormData();
              data.append("file", files[0]);
              data.append("min_role_read", 10);
              $.ajax({
                data: data,
                type: "POST",
                url: "/files/upload",
                cache: false,
                headers: {
                  "CSRF-Token": _sc_globalCsrf,
                },
                contentType: false,
                processData: false,
                success: function(resp) {
                  var baseurl = window.location.origin;
                  var url=window.location.origin+resp.success.url
                  var image = $('<img>').attr('src', url);
                  $('#input${text(nm)}').summernote("insertNode", image[0]);
                }
              });
            }
          }
        });`)
      )
    ),
};

const dependencies = ["@saltcorn/html"];

module.exports = {
  sc_plugin_api_version: 1,
  fieldviews: { Summernote },
  headers,
  dependencies,
};

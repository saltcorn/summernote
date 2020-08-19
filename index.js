const {
  input,
  div,
  text,
  script,
  domReady,textarea,
  style
} = require("@saltcorn/markup/tags");

const headers = [
  {
    script: "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js"
  },
  {
    css: "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css"
  }
];

const Summernote = {
  type: "HTML",
  isEdit: true,
  run: (nm, v, attrs, cls) =>
    div(
      {
        class: [cls]
      },
      textarea(
        {
          name: text(nm),
          id: `input${text(nm)}`,
          rows: 10
        },
        v || ""
      ),
      script(
        domReady(`$('#input${text(nm)}').summernote({height:150});`)
      )
    )
};

const dependencies = ["@saltcorn/html"];

module.exports = {
  sc_plugin_api_version: 1,
  fieldviews: { Summernote },
  headers,
  dependencies
};

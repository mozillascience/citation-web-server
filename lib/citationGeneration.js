"use strict";

let express = require('express');
let CitationCore = require('citation-core');
/**
 * Consumes the citation from the user and passes it to CitationCore.
 * @param  JSON req Passes in the string of the website to be cited, as well as the citation type.
 * @param  String res String that is passed back to the website and displayed to the user.
 * @return String     the string that is returned.
 */
exports.generate = function(req, res) {
  let siteToCite = req.body;
  let formatOptions = new CitationCore.FormatOptions();
  formatOptions.url = siteToCite.url;
  formatOptions.style = CitationCore.styles[siteToCite.style];
  CitationCore.generate(formatOptions, (citationStr, errors) => {
    return res.send({"citation": citationStr});
  });
};

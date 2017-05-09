

const CitationCore = require('citation-core');
/**
 * Consumes the citation from the user and passes it to CitationCore.
 * @param  JSON req Passes in the string of the website to be cited, as well as the citation type.
 * @param  String res String that is passed back to the website and displayed to the user.
 * @return String     the string that is returned.
 */

exports.generate = (req, res) => {
  const siteToCite = req.body;
  const formatOptions = new CitationCore.FormatOptions();
  formatOptions.url = siteToCite.url;
  formatOptions.style = CitationCore.styles[siteToCite.style];

  formatOptions.token = siteToCite.token;
  console.log(formatOptions.token);
  CitationCore.generate(formatOptions, (citationStr, errors) => res.send({ citation: citationStr }));
};

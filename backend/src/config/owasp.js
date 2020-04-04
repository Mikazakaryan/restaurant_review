const owasp = require('owasp-password-strength-test');

owasp.config({
  minLength: 6,
  minPhraseLength: 6,
  minOptionalTestsToPass: 2,
});

module.exports = owasp;

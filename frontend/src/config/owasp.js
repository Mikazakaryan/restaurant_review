import owasp from 'owasp-password-strength-test';

owasp.config({
  minLength: 6,
  minPhraseLength: 6,
  minOptionalTestsToPass: 2,
});

export default owasp;

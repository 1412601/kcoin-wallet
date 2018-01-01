const key = require("../../config/key");

module.exports = email => {
  return `
<html>
<body>
  <div style="text-align: left;">
    <h3>Welcome to Kcoin Wallet</h3>
    <h3>Let's confirm your email address</h3>
    <p>By clicking on the following link, you are confirming your email address:</p>
    <div>
      <a href="${key.redirectDomain}/api/emails/${
    email.id
  }/activate">Confirm Email Address</a>
    </div>
  </div>
</body>
</html>`;
};

const key = require("../../config/key");

module.exports = (email, trans) => {
  return `
  <html>
  <body>
    <div style="text-align: left;">
      <h3>Kcoin Wallet</h3>
      <p>Hi,</p>
      <p>Your new Kcoin Wallet transaction has been initialized. Please check the information below.</p>
      <h4>Transaction Information</h3>
      <div>
        <p>From: ${trans.from}</p>
        <p>To: ${trans.to}</p>
        <p>Amount: ${trans.value}</p>
      </div>
      <h4>Please confirm so we can proceeed your transaction: 
        <a href="${key.redirectDomain}/api/transaction/${
    trans.id
  }/confirm">Confirm</a>
        || <a href="${key.redirectDomain}/api/transaction/${
    trans.id
  }/cancel">Cancel</a>
      </h3>
    </div>
  </body>
  </html>`;
};

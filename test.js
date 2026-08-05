const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.nextforum.v4clptz.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);

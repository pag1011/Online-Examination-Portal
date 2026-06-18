const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://prachi:Prachi051110@ac-ql71crm-shard-00-00.5bnggvp.mongodb.net:27017,ac-ql71crm-shard-00-01.5bnggvp.mongodb.net:27017,ac-ql71crm-shard-00-02.5bnggvp.mongodb.net:27017/?ssl=true&replicaSet=atlas-z5bj50-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => {
  console.log("Connected Successfully");
})
.catch((err) => {
  console.log(err);
});
exports = function(authEvent) {
  const user = authEvent.user;
  const collection = context.services.get("mongodb-atlas").db("db1").collection("users");
  const data = user.data;
  
  collection.findOneAndUpdate({ "email" : data.name }, { $set: { user_id: user.id, created_at: new Date() },})
};

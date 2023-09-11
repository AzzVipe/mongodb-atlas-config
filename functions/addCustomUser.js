exports = function(authEvent) {
  const user = authEvent.user;
  const collection = context.services.get("mongodb-atlas").db("db1").collection("users");
  const data = user.data;
  
  collection.findOne({ "user_id" : user.id })
  .then((temp) => {
    if(temp == null) {
      collection.insertOne(
        { user_id: user.id, data: data, created_at: new Date() }
      );
    } else if(!temp.hasOwnProperty("picture")) {
      collection.updateOne({ userID: user.id }, {$set: { data: data }})
    }
  })
};

exports = function(authEvent) {
  const user = authEvent.user;
  const collection = context.services.get("mongodb-atlas").db("db1").collection("users");
  const data = user.data;
  
  collection.findOne({ primary_email: data.email })
  .then((temp) => {
    if(temp == null) {
      collection.insertOne(
        { user_id: user.id, first_name: data.first_name, last_name: data.last_name, full_name: data.name, primary_email: data.email, image_url: data.picture, created_at: new Date() }
      );
    } else if(!temp.hasOwnProperty("user_id")) {
      collection.updateOne({ primary_email: data.email }, {$set: { user_id: user.id }})
    }
  })
};

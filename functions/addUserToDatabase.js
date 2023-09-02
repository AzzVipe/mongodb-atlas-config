exports = function(authEvent) {
  const user = authEvent.user;
  const collection = context.services.get("mongodb-atlas").db("db1").collection("users");
  const data = user.data;
  
  collection.findOne({ "user_id" : user.id })
  .then((temp) => {
    if(temp == null) {
      collection.insertOne(
        { user_id: user.id, first_name: data.first_name, last_name: data.last_name, full_name: data.name, primary_email: data.email, image_url: data.picture, created_at: new Date() }
      );
    } else if(!temp.hasOwnProperty("picture")) {
      collection.updateOne({ userID: user.id }, {$set: { picture: data.picture }})
    }
  })
};

exports = function(authEvent) {
  const user = authEvent.user;
  const collection = context.services.get("mongodb-atlas").db("db1").collection("users");
  const data = user.data;
  
  const customFunctionIdentity = user.identities.find((id) => {
    return id.provider_type === "custom-function";
  });
  
  const externalId = customFunctionIdentity.id;
  
  collection.findOne({ "user_id" : user.id })
  .then((temp) => {
    if(temp == null) {
      collection.insertOne(
        { user_id: user.id, data: data, created_at: new Date(), external_id: externalId }
      );
    } else if(!temp.hasOwnProperty("picture")) {
      collection.updateOne({ user_id: user.id }, {$set: { data: data, external_id: externalId }})
    }
  })
};

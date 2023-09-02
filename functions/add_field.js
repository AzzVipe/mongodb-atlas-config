exports = async function(arg){
  let collection = context.services.get("mongodb-atlas").db("db1").collection("tasks");
  let temp = {
    stages: [
      { name: "Todo", date: new Date(), description: "", comment: ""},
      { name: "In Progress", date: new Date(), description: "", comment: ""},
      { name: "Interview", date: new Date(), description: "", comment: ""},
      { name: "Hired", date: new Date(), description: "", comment: ""}
    ],
    current_stage: "Hired", 
    assignee: "", 
    owner: "", 
    notes: [] 
  }

  let findResult;
  try {
    findResult = await collection.updateMany({},{$set: { status_pipeline: temp}});
    console.log(findResult);

  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);

    return { error: err.message };
  }

  return { result: findResult };
};
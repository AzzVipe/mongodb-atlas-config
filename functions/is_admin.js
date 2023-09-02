exports = async function(arg){
  
  let role = context.user.custom_data.role;
  
  return role === "superuser";
};
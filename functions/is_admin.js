exports = async function(arg){
  if(!context.user.custom_data) return false;
  
  let role = context.user.custom_data.role;
  
  return role === "superuser";
};
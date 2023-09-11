exports = async function({email, deviceId}){
  const userCollection = context.services.get('mongodb-atlas').db('db1').collection('users')
  const user = await userCollection.findOne({email:email})
  
  if(!user){
    throw new Error(`Authentication Failed: user/device doesn't exist 1`)
    return 
  }
  
  const device = user.devices.find(device=>device._id.toString()===deviceId)
  
  if(!device){
    throw new Error(`Authentication Failed: user/device doesn't exist`)
    return 
  }
  
  return {
    id:user._id.toString(),
    name:email,
  }
};
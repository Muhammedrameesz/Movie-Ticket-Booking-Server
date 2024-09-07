const cancelBookingSchema = require('../model/cancelBookingRequests')
const theaterSchema = require('../model/theaterScema')
const adminSchema = require('../model/adminSchema')
const userSchema = require('../model/userSchema')

const cancelRequst = async(req,res)=>{
    try {
        const data= req.body
        if(!data){
            console.log('incompleted data');
            res.status(403).json({message:'incompleted data'})
        }
        const{_id,userId,amount, totalReservation,movieName, theaterName,seetNumbers,date,time, paymentDate}=data
        const theaterExist = await theaterSchema.findOne({name:theaterName})
        if(!theaterExist){
            console.log('no theater exist');
           res.status(404).json({message:'theater not exist'})
        }
        const ownerId=theaterExist.owner
        const newCancelation = new cancelBookingSchema({
            orderId:_id,
            userId:userId,
            ownerId:ownerId,
            amount:amount,
            totalResurvation:totalReservation,
            movieName:movieName,
            theaterName:theaterName,
            seetNumbers:seetNumbers,
            date:date,
            time:time,
            paymentDate:paymentDate
        })
        if(!newCancelation){
            console.log('cancel request not matching to the modal');
            res.status(409).json({message:'cancel request not matching to the modal'})
        }
        await newCancelation.save()
        res.status(200).json({message:'Booking cancellation request submitted successfully.'})
    } catch (error) {
        console.log(error);
        res.status(500).json('internal server error')
    }
}

   const getCancelRequestsForUser = async(req,res)=>{
    try {
       
           const user=req.user
           if(!user){
            console.log('invalid credencials');
            res.status(403).json({message:'credencials'})
           }
           const userExist = await userSchema.findOne({email:user})
           if(!userExist){
            console.log('cant find user');
            res.status(404).json({message:'cant find user'})
           }

           const  userId = userExist._id
           const userCancellationBookings = await cancelBookingSchema.find({userId:userId})
           if(!userCancellationBookings){
            console.log('userId not found');
            res.status(404).json({message:'userId not found'})
           }
           res.status(200).json(userCancellationBookings)

      } catch (error) {
         console.log(error);
         res.status(500).json({message:'internal server error'})
    }
 }

 const getCanceleationForAdmin = async(req,res)=>{
    try {
       
        const owner=req.admin
        if(!owner){
         console.log('invalid credencials');
         res.status(403).json({message:'credencials'})
        }
        const ownerExist = await adminSchema.findOne({email:owner})
        if(!ownerExist){
         console.log('cant find owner');
         res.status(404).json({message:'cant find owner'})
        }
        const  ownerId = ownerExist._id

        const ownerCancellationBookings = await cancelBookingSchema.find({ownerId:ownerId})
        if(!ownerCancellationBookings){
         console.log('ownerCancellation not found');
         res.status(404).json({message:'ownerCancellation not found'})
        }
        res.status(200).json(ownerCancellationBookings)

   } catch (error) {
      console.log(error);
      res.status(500).json({message:'internal server error'})
 }
    
 }

module.exports ={cancelRequst,getCancelRequestsForUser,getCanceleationForAdmin}
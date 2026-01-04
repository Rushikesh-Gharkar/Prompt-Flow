const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String , required:true , unique:true , index:true},
    password : {type:String , required:true},
    role : {type:String , enum : ["admin" , "user"] , default:"user"},
    account : {type : String , enum : ["active" , "suspended" , "disabled"] , default:"active"},
    usage_tracking : {
          prompts_used: { type: Number, default: 0 },
        videos_generated: { type: Number, default: 0 },
        daily_prompts_used: { type: Number, default: 0 },
        last_used_at: { type: Date }
    } ,

},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

exports.user = mongoose.model('User' , userSchema);
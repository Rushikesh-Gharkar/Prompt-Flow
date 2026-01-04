const  mongoose = require("mongoose")

const promptSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true,
        index : true
    },
    prompt_text : {type: String , required:true},
    explanation : {type:String},
    use_cases:{type : [String]},
     video_script: {
        type: String
    },

    audio_url: {
        type: String
    },

    video_url: {
        type: String
    },
     status: {
        type: String,
        enum: [
            'CREATED',
            'AI_GENERATED',
            'VIDEO_PROCESSING',
            'COMPLETED',
            'FAILED'
        ],
        default: 'CREATED',
        index: true
    },
      difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },

    duration_seconds: {
        type: Number,
        default: 60
    },

    failure_reason: {
        type: String
    },

    regeneration_count: {
        type: Number,
        default: 0
    }
},
{
    timestamps : {createdAt : 'created_at' , updatedAt : 'updated_at'}
}
)

exports.prompt = mongoose.model('Prompt' , promptSchema)
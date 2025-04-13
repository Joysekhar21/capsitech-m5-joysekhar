import mongoose,{Schema} from "mongoose";

const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

export const Todo = mongoose.model("todo", todoSchema)
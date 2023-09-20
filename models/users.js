const mongoose= require('mongoose');
//for uploading a file/image
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null, path.join(__dirname,'..',AVATAR_PATH));  // __dirname = models/    + ../uploads/users/avatar
        }
    },{
        filename: function(req,file,cb){
            cb(null,file.fieldname + '-'+ Date.now());
        }
});

//static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;
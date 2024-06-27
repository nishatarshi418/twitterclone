import mongoose from "mongoose";




    
  
  

    

        
 

  const userSchema  = new mongoose.Schema({
   
    //member since july 2021 createdAt
    
   

   
     
      
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    fullnName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],

    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    profileImg:{
        type:String,
        default:"",
    },
    coverImg:{
        type:String,
        default:"",

    },
    Bio:{
        type:String,
        default:"",

    },
    link:{
        type:String,
        default:"",
    }

    
},{timestamps:true}

);



const  User = mongoose.model ("User",userSchema);
export default User;




    
  


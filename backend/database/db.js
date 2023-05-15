import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const connection = async () => {
    const URL = "mongodb+srv://i200760:khadija121@project.ehvgk4g.mongodb.net/?retryWrites=true&w=majority";
    try {
      

        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;
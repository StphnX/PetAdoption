import mongoose from "mongoose";
const Schema = mongoose.Schema;

const petSchema = new Schema({

    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    animal_type: { type: String, required: true },
    health_status: { type: String, required: true },
    address: { type: String, required: true },
    zipcode: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    // picture: { type: String, required: true },
    image: {
        public_id: {type: String},
        url: {type: String}
    }



});

const PetModel = mongoose.model("Pet", petSchema);

export default PetModel;
const mongoose=require('mongoose');

const connection=mongoose.connect('mongodb+srv://vivek_1234:vivek_1234@notes.zzv1zwv.mongodb.net/emp_data?retryWrites=true&w=majority');

module.exports={connection};

import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const accountSchema = new mongoose.Schema({
    accountNumber: { 
        type: Number,
        required: true, 
        unique: true 
    },
    document: { 
        type: String,
        default: null
    },
    dateOpening: { 
        type: Date,
    },
    balance: { 
        type: Number,  
        default: 0
    },
    key: { 
        type: String, 

    }
});

const AutoIncrement = AutoIncrementFactory(mongoose);

accountSchema.plugin(AutoIncrement, { inc_field: 'accountNumber' });

const Account = mongoose.model('account', accountSchema, 'account');

export default Account;

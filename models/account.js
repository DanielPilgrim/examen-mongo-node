import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence'; // Asegúrate de importar el plugin correctamente

const connection = mongoose.connection; // Obtén la conexión activa
const AutoIncrement = AutoIncrementFactory(connection); // Asocia el plugin con la conexión

const accountSchema = new mongoose.Schema({
    document: { 
        type: String,
        default: null
    },
    dateOpening: { 
        type: Date,
        default: Date.now
    },
    balance: { 
        type: Number,  
        default: 0
    },
    key: { 
        type: String, 
    },
    observation: {
        type: String
    },
    estado: { 
        type: String, 
        enum: ['activo', 'inactivo'], 
        default: 'activo'
    }
});

// Aplica el autoincremento al campo 'accountNumber'
accountSchema.plugin(AutoIncrement, { inc_field: 'accountNumber' });

const Account = mongoose.model('Account', accountSchema);

export default Account;

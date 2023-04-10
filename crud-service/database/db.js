import mongoose from 'mongoose';

const Connection = async () => {
    const URL = `mongodb://krishan:krishan@ac-w8pxjmb-shard-00-00.jvwtq7f.mongodb.net:27017,ac-w8pxjmb-shard-00-01.jvwtq7f.mongodb.net:27017,ac-w8pxjmb-shard-00-02.jvwtq7f.mongodb.net:27027/?ssl=true&replicaSet=atlas-tt5uwo-shard-0&authSource=admin&retryWrites=true&w=majority`

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;
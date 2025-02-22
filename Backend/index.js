const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
// app.use(
//     cors({
//         origin: ['http://localhost:5173',],
//         credentials: true
//     })
// );
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jwii9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function run() {
    try {
        // const taskManagement = client.db('taskManagement');
        // const taskCollection = taskManagement.collection('allTasks');
        // const userCollection = taskManagement.collection('allUsers');

        const taskCollection = client.db('TaskManagement').collection('allTasks');
        const userCollection = client.db('TaskManagement').collection('allUsers');

        // Get Users
        app.get('/users', async (req, res) => {
            const findUsers = userCollection.find({});
            const result = await findUsers.toArray();
            res.send(result);
        });

        // Post User
        app.post('/user', async (req, res) => {
            const userInfo = req.body;
            const id = { userID: userInfo.userID };
            const existedUser = await userCollection.findOne(id);

            if (existedUser) {
                return res.send({ message: 'User already exists', insertedId: null });
            }

            const insertResult = await userCollection.insertOne(userInfo);
            res.send(insertResult);
        });

        // Get All Tasks for a User
        app.get('/tasks', async (req, res) => {
            const uid = req.query.uid;
            const query = { userID: uid };
            const findTasks = taskCollection.find(query);
            const result = await findTasks.toArray();
            res.send(result);
        });

        // Post Task
        app.post('/tasks', async (req, res) => {
            const taskData = req.body;
            taskData.timestamp = new Date().toISOString();
            taskData.order = (await taskCollection.countDocuments({ userID: taskData.userID })) + 1; // Set order
            const insertResult = await taskCollection.insertOne(taskData);
            res.send(insertResult);
        });

        // Update Task (for drag-and-drop and reordering)
        app.patch('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const updatedTask = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = { $set: updatedTask };
            const result = await taskCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // Delete Task
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await taskCollection.deleteOne(filter);
            res.send(result);
        });

        // Reorder Tasks
        app.post('/tasks/reorder', async (req, res) => {
            const { userID, category, reorderedTasks } = req.body;
            const bulkOps = reorderedTasks.map((task, index) => ({
                updateOne: {
                    filter: { _id: new ObjectId(task._id), userID, category },
                    update: { $set: { order: index + 1 } }
                }
            }));
            const result = await taskCollection.bulkWrite(bulkOps);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from Task Management Server....');
});

app.listen(port, () => console.log(`Server running on port ${port}`));

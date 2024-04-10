const express = require("express");
const cors = require("cors");
const app = express();

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const registerUser = async (details) => {
  const client = new MongoClient(uri);
  try {   
      const database = client.db('cartapp');
      const registerTable = database.collection('users');

      const query = { email: details.email, password: details.password, name: details.name, contect: details.contect, address: details.address };
      const account = await registerTable.insertOne(query);
      return "Ok"; // Return a success message after successful insertion
  } catch (ex) {
      return "Internal Server Error"; // Return an error message
  }
  finally {
    client.close();
}
};

app.post('/register', async (req, res) => {
  let details = req.body;
  try {
      const result = await registerUser(details);
      if (result === "Ok") {
          res.json({ status: "Ok" });
      } else {
          res.json({ status: "Internal Server Error" });
      }
  } catch (err) {
      res.json({ status: "Internal Server Error" });
  } 
});

// app.post('/login', (req, res) => {
//     let details = req.body;
//     let isFound = false;
//     try {
//             const database = client.db('cartapp');
//             const registerTable = database.collection('users');
        
//             const query = {email: details.email, password:details.password};

//             registerTable.findOne(query, function(err, user){
//                 if(err) throw new Error(err);
//                 if(user) 
//                   isFound = true;
//             })

//           } 
//           catch(ex){
//             res.json({ status: "Internal Server Error" });
//           }finally {
//             // Ensures that the client will close when you finish/error
//              client.close();
//           }
//           if(isFound)
//             res.json({ status: "Ok" });
//           else
//             res.json({status:"not found"});
// });


app.post('/login', async (req, res) => {
  let details = req.body;
  const client = new MongoClient(uri);
  try {
      // ... (same as before)
      const database = client.db('cartapp');
       const registerTable = database.collection('users');
        
      const query = {email: details.email, password:details.password};
      const user = await registerTable.findOne(query);
      if (user) {
          res.json({ status: "Ok" });
      } else {
          res.json({ status: "not found" });
      }
  } catch (ex) {
      res.json({ status: ex.message });
  } finally {
      client.close();
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
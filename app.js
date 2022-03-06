var express=require('express');
var app=express();
var dotenv=require('dotenv');
var mongo=require('mongod');
var MongoClient=mongo.MongoClient;
dotenv.config();
const mongoUrl='mongodb+srv://deepikajoge:LHCdata@cluster0.1uzqt.mongodb.net/data?retryWrites=true&w=majority';
var cors=require('cors')
const bodyParser=require('body-parser')
var port=process.env.PORT||8125;

var db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/features',(req,res)=>{
    db.collection('medicalfeatures').find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
    })
      
  })

app.get('/services',(req,res)=>{
    db.collection('medicalservices').find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
    })
      
  })

  //wrt to feature id
app.get('/services/:id',(req,res)=>{
  var id=parseInt(req.params.id);
  db.collection('medicalservices').find({Feature_id:id}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  })
    
})


db.collection('room').find(query).sort(sort).toArray((err,result)=>{
  if(err) throw err;
  res.send(result)
})

MongoClient.connect(mongoUrl,(err,client)=>{
  if(err) console.log("Error while connectiong")
  db=client.db('LHCProject')
  app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
  
  })
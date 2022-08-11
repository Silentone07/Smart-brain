const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
 //const bcrypt=require('bcryptjs');
 const cors=require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
 const knex=require('knex');

  const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Amitrk@123',
      database : 'MydataBase',
    }
  });


const database = {
    users: [
        {
            id: '123',
            name: 'amit',
            email: 'amitrk@gmail.com',
            password: '123',
            entries: '0',
            joined: new Date()
        },
        {
            id: '124',
            name: 'Rahul',
            email: 'amit@gmail.com',
            password: '54858',
            entries: '0',
            joined: new Date()
        },
    ]
};
app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) { 
        //console.log(req.body);
        return res.json(database.users[0]);
    }
    else {
        res.status(400).json("error login");
    }
});
app.post('/register',(req,res)=>{
    const{name,email,password}=req.body;
    db('users').insert({
        email:email,
        name:name,
        joined:new Date()}).then(console.log)
    res.json(database.users[database.users.length-1]);

})
 app.get('/profile/:id', (req,res)=>{
     const{id}=req.params;
     let found=false;
      database.users.forEach(users=>{
          if(users.id===id) {
              found=true;
         return  res.json(users);
          }
        })
          if(!found){
              res.status(400).json("no such user");
          }
       
 })
  app.put('/image',(req,res)=>{
    const{id}=req.body;
    let found=false;
     database.users.forEach(user=>{
         if(user.id===id) {
             found=true;
             user.entries++;
        return  res.json(user.entries);
         }
       })
       if(!found){
        res.status(400).json("no such user");
    }

  })

app.listen(3003, () => {
    console.log("app is running on port");
});
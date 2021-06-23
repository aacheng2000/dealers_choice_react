const { syncAndSeed, Thing } = require('./db');
const express = require('express')
const app = express();
//const {syncAndSeed, models: { User}} = require('./db');
const path = require('path')
const middleware = require('method-override')('_method'); //for delete
//console.log(middleware.toString());
const faker = require('faker');

   
    
    
app.use(require('express').urlencoded({ extended: false })); //for create
app.use(middleware); //for delete
app.use('/dist', express.static(path.join(__dirname, 'dist')))
//app.use('/assets', express.static(path.join(__dirname, 'assets')))



app.get('/', (req,res,next)=> res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/things', async(req, res, next)=>{
    try{
        res.send(await Thing.findAll({
            
        }))
    }
    catch(ex){
        next(ex)
    }
})

app.delete('/api/things/:id', async(req, res, next)=>{
  try {
    const thing = await Thing.findByPk(req.params.id);
    await thing.destroy();
  }
  catch(ex){
    next(ex);
  }
})

app.post('/api/things', async(req, res, next)=> {
  try {
    await Thing.create({name: faker.name.findName()});
    //res.redirect('/');
  }
  catch(ex){
    next(ex);
  }
});


const init=async()=> {
    try {
        await syncAndSeed()
        const port = process.env.PORT || 3000
        app.listen(port, ()=> console.log(`listening on port ${port}`))
    }
    catch(ex){
        console.log(ex);
    }
}


init()



//TERMINAL
// npm i faker
// npm run start:dev
// npm i webpack webpack-cli --save-dev
// touch webpack.config.js
// npm i react react-dom babel-loader @babel/core @babel/preset-react --save-dev
// echo node_modules >> .gitignore
// echo dist >> .gitignore
// git add .
// git commit -m 'first commit'

// build:webpack
// build:dev npm run build -- --mode=development --watch
// start:dev nodemon server.js --ignore dist/ --ignore src/ & npm run build:dev
// npm i axios --save-dev

//34:19

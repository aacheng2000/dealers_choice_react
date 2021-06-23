const { syncAndSeed, Thing } = require('./db');
const express = require('express')
const app = express()
const path = require('path') // This is needed to send a file?
//app.use(express.urlencoded({ extended: false })); //This is needed for the POST request (Adding to list)
const middleware = require('method-override')('_method'); //This is need for DELETE request
app.use(middleware); //This is need for DELETE request

// app.post('/things', async(req, res, next)=> {
//   try {
//     await Thing.create({name:req.body.newname});
//     res.redirect('/');
//   }
//   catch(ex){
//     console.log('error!')
//     next(ex);
//   }
// });

// app.delete('/things/:id', async(req, res, next)=> {
// 	try{
// 		const thing = await Thing.findByPk(req.params.id)
// 		await thing.destroy()

// 		res.redirect("/");
// 	}
// 	catch(ex){
// 		next(ex);
// 	}
// });

app.get('/', (req,res,next)=> res.sendFile(path.join(__dirname, 'index.html')))

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

// app.get('/', async(req,res) => { //request, response

//   res.send()
  
//   res.send(`<html>${(await Thing.findAll()).map(x=>
//   `<div><form method='POST' action='/things/${x.id}?_method=DELETE'>
//     <button>${x.id}</button></form>${x.name}</div>`).join('')}
//     <form method='POST' action='/things'>
//       <input type="text" name="newname">
//       <input type="submit" value="Submit">
//     </form></html>`) 
// })


const init = async() => {
  try {
    //await syncAndSeed()
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  }
  catch(ex) {
    console.log(ex)
  }
}

init()
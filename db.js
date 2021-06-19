//sequelize
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/toDoDb')  //we use the database 'dbs'

const thing = db.define('person', { //define the person database
  name: Sequelize.STRING

})

//syncAndSeed defined
const syncAndSeed = async() => {
await thing.sync({force:true}) //create the table (sync)

const thingAdd = new thing({name: 'Allie'}) //add item (seed)
await thingAdd.save()

}



const init = async()=>{
  try {
    await syncAndSeed();
//    const port = process.env.PORT || 3000;
//    app.listen(port, ()=> console.log(`listening on port ${port}`))
  }
  catch(ex) {
    console.log(ex.message)
  }
}

init()
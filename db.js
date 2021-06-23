// SEQUELIZE- CREATE TABLE
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/toDoDb')  //we use the database 'dbs'
const Thing = db.define('thing', { //define the person TABLE
  name: Sequelize.STRING
})

// SYNC AND SEED FUNCTION
const syncAndSeed = async() => {
await Thing.sync({force:true}) //create the table (sync)
const ThingAdd1 = new Thing({name: 'Go to Fullstack Class'}) //add item (seed)
await ThingAdd1.save()
const ThingAdd2 = new Thing({name: 'Finish the workshops'}) //add item (seed)
await ThingAdd2.save()
const ThingAdd3 = new Thing({name: 'Finish my homework on time'}) //add item (seed)
await ThingAdd3.save()
const ThingAdd4 = new Thing({name: 'Watch the videos'}) //add item (seed)
await ThingAdd4.save()
const ThingAdd5 = new Thing({name: 'Try the stretches'}) //add item (seed)
await ThingAdd5.save()
}

module.exports = {syncAndSeed, Thing}
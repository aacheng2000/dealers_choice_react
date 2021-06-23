import React from 'react'
import ReactDOM from 'react-dom'
import {Component} from 'react'
import axios from 'axios'

class App extends Component{
    constructor() {
        super();
        this.state = {
            things: [],
            numberId: ''
        }
         this.update = this.update.bind(this)
         this.deleteTask = this.deleteTask.bind(this)
         this.createTask = this.createTask.bind(this)

    }
    async componentDidMount(){
        const things = (await axios.get('/api/things')).data
        await this.setState({things})

    }
  
    update(){
        
        alert(this.state.things.length)
    }
  
    displayAlert(){
        alert('lets add something there')
        this.render() //is this necessary?
    }
    
    myChangeHandler = (event) => {
    this.setState({things:this.things});
    }
  
    async deleteTask(){

      //  await axios.delete(`/api/things/1`)
   

    
  //  const things = (await axios.get('/api/things')).data
//    await this.setState({things: things})  
    //alert(things.length)

   // await this.setState({things: things})    
        
        
      // alert('delete successful?')
     //  this.setState({things:this.things})
    }
    async createTask(){
       // const things = await axios.post('/api/things')
       const things = (await axios.get('/api/things')).data
       await this.setState({things: things}) 
       // alert(things.length)
        
    }
    
    render(){
        const {things, selectedUserId} = this.state;
        return (
            <div>
            <h1>Don't Forget to:</h1>
            <form action={'api/things'} method='POST'>
            <button onClick={this.createTask}>Create</button>

            </form>
            <ul>

                {
                    things.map(thing=>{
                        return (
                            <div key = {thing.id}>
                            <form action={`/api/things/${thing.id}?_method=delete`} method='POST'>
                            <button onClick={this.deleteTask}>x</button>{` - ${thing.name}`}
                            </form>
                            </div>
                        )
                    })
                }
            </ul>
            <div>
            {
                selectedUserId
            }
            </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))

{/*class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    return (
      <form>
      <h1>Hello {this.state.username}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
} */}
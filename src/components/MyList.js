import React, { Component } from 'react'
import '../style/main.css'
export default class MyList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            error: null,
            isLoaded: false,
            items: []
        }

        this.delete = this.delete.bind(this)
        this.update = this.update.bind(this)
        this.createTest = this.createTest.bind(this)
        this.change = this.change.bind(this)
    }



    componentWillMount() {
        fetch("https://localhost:44341/home/Index")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    create() {
        let date = {
            Text: "Test",
            IsDone: true
        }
        fetch("https://localhost:44341/home/Create", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(date)
        }).then(r => r.json()).then(res => {
            if (res) {
                this.setState({ message: 'Created Successfully' })
                console.log(res)
            }
        })
        // window.location.reload(false);  
    }


    createTest() {
        let date = {
            Text: this.state.input,
            IsDone: false
        }
        fetch("https://localhost:44341/home/Create?Text="+date.Text+"&"+date.IsDone, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(date)
        }).then(r => r.json()).then(res => {
            if (res) {
                this.setState({ message: 'Created Successfully' })
                console.log(res)
            }
        })
         window.location.reload(false);  
    }


    delete(event) {
        let date = {
            id: event.target.value
        }
        fetch("https://localhost:44341/home/Delete?id="+event.target.value, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(r => r.json()).then(res => {
            if (res) {
                this.setState({ message: 'Delete Successfully' })
                console.log(res)
            }
        })
        window.location.reload(false);      
    }
    update(event) {
        console.log(event.target.value)
        let date = {
            Text: "Test Update",
            IsDone: true
        }
        fetch("https://localhost:44341/home/Edit?id="+event.target.value, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(date)
        }).then(r => r.json()).then(res => {
            if (res) {
                this.setState({ message: 'Update Successfully' })
                console.log(res)
            }
        })
         window.location.reload(false);  
    }
    change(event) {
        this.setState({
            input: event.target.value
        })
        console.log(this.state.input)
    }
    render() {
        const { error, isLoaded, items } = this.state
        if (error) {
            return <p>Error {error.message}</p>
        } else if (!isLoaded) {
            return <p>Loading....</p>
        } else {
            return (
                <div >
                    <div className="myDIV">
                        <h1>My To Do List</h1>
                    <input value={this.state.input} onChange={this.change} type="text" />
                    <button className="addBtn" onClick={this.createTest}>add</button>
                    </div>
                    <table>
                        <thead>
                            <th>Task</th>
                            <th>IsDone</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </thead>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td> {item.text}</td>
                                <td> <input type="checkbox" disabled /></td>
                                <td>
                                    <button value={item.id} onClick={this.delete}>Delete</button> 
                                </td>
                                <td>
                                    <button value={item.id} onClick={this.update}>Update</button> 
                                </td>
                            </tr>
                        ))}
                       
                    </table>                  
                    <p>{this.state.message}</p>
                </div>
            )
        }
    }
}

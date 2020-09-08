import React, { Component } from 'react';
import AddTodo from "./Todos/AddTodo";
import SideNav from "./SideNav";
import Today from "./Todos/Today";

export default class Home extends Component {
    render() {
        return (
            <div>
                <SideNav/>
                <div className="mt-4 main">
                    <Today/>
                    <AddTodo/>
                </div>
            </div>
        )
    }
}
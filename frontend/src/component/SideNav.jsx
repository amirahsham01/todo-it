import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideNav extends Component {
    render() {
        return (
            <div>
                <div className="sidenav">
                <Link to="/all"><img src="/inbox.png" height="35px" className="pr-2" alt="inbox"/>All My To-dos</Link>

                <Link to="/home"><img src="/today.png" height="32px" className="pr-2" alt="today"/>Today</Link>

                <Link to="/tmrw"><img src="/tomorrow.png" height="32px" className="pr-2" alt="tomorrow"/>Tomorrow</Link>

                    <div className="projects"><strong>Projects</strong></div>
                    {/* <li><strong>Projects</strong>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                        </ul>
                    </li> */}
                    <div className="tab mt-2"><strong>Labels</strong></div>
                </div>
            </div>
        )
    }
}

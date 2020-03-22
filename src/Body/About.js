import React from 'react';
import './About.css';
import Person from './About/Person';
import {aboutFromServer} from "../db/db_methods";
import JsxParser from 'react-jsx-parser';


class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ""
        }
    }
    componentDidMount() {
        let persons = [];
        let simon = {
            name:"Simon",
            focusAreas:["React Architect", "Front-end", "Visualizer", "CSS", "Javascript"]
        };
        persons.push(simon);
        let fredrik = {
            name:"Fredrik",
            focusAreas:["Front-end server connections", "Backend", "Debugging"]
        };
        persons.push(fredrik);

        let pageFromServer = aboutFromServer(persons);
        pageFromServer.then(result => {
            this.setState({data: result.data});
            console.log(this.state.data);
        });


    }

    /*
    render() {
        return (
            <div className="body" id="about">
                <h1>Team Bromölla ka!</h1>
                <div id="peoples">
                    <Person name="Simon" focusArea={["React Architect", "Front-end", "Visualizer", "CSS", "Javascript"]} />
                    <Person name="Fredrik" focusArea={["Front", "Back", "Test"]} />
                </div>
            </div>

        );
    }
     */
    render() {
        console.log(this.state.data);
        
        return (<div>
            <JsxParser
            components={{Person}}
            jsx={this.state.data} />
        </div>)
    }
}

export default About;

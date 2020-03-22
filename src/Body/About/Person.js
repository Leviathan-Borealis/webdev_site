import React from 'react';
import './Person.css';

class Person extends React.Component {
    render() {
        return (
            <div id="person">
                <h2>{this.props.name}</h2>
                <p>{this.props.focusArea.map((focus,i) => 
                    <li key={i}>{focus}</li>
                )}</p>
            </div>
        );
    }
}

export default Person;
import React from 'react';
import './Songlist.css';

class Songlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    handleLeftClick(i) {
        if(this.props.onSelectSong != null) {
            this.props.onSelectSong(i)
        } 
    }
    handleRightClick(e, i) {
        if(this.props.onDeleteSong != null) {
            e.preventDefault();
            this.props.onDeleteSong(i)
        }
    }
    handleEditClick(i) {
        if(this.props.onEditSong != null)
            this.props.onEditSong(i);
    }
    render() {
        const divStyle = {
            width: this.props.width,
            height: this.props.height
        }
        const songlist = this.props.songs != null ? this.props.songs.map((song, i) => 
            <tr key={i} onClick={() => this.handleLeftClick(i)} onContextMenu={(e) => this.handleRightClick(e, i)} >
                <td>{song.title}</td>  
                {this.props.onEditSong != null ? <td className="smallButton" onClick={() => this.handleEditClick(i)}>Edit</td>
                : null}
            </tr>       
            ) : null
        return (
            <div id="songlist" style={divStyle}>
                {songlist}
            </div>
        );
    }
}

export default Songlist;

import './Admin.css';
import React from 'react';
import Songlist from '../Components/Songlist'
import {getVideos, deleteSongFromAllAtmosphereByAdmin, updateSongTitleByUser} from '../db/db_methods';

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            songs: [{}]
        }
    }
    componentDidMount() {
        this.fetchSongs()
    }
    fetchSongs() {
        const fetchSongs = getVideos();
        fetchSongs.then((result) => {
            this.setState({
                songs: result.data
            })
        })
    }
    handleRemoveSong = (i) => {
        var shouldDelete = window.confirm("Are you sure you want to delete this song?");
        if(shouldDelete) {
            const deleteSongPromise = deleteSongFromAllAtmosphereByAdmin(this.props.context.userId, this.state.songs[i].id)
            deleteSongPromise.then((result) => {
                this.fetchSongs()
            })
        }
    }
    handleEditSong = (i) => {
        const value = prompt("Change Title name on selected song");
        const updateTitlePromise = updateSongTitleByUser(this.state.songs[i].id, value, this.props.context.userId)
        updateTitlePromise.then((result) => {
            this.fetchSongs()
        })
    }
    render() {
        return (
            <div className="body" id="admin">
                <h1>HELLO ADMIN</h1>
                <table>
                    <Songlist songs={this.state.songs} onEditSong={this.handleEditSong} onDeleteSong={this.handleRemoveSong} />
                </table>
            </div>
        );
    }
}

export default Admin;

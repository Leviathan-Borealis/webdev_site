import './Playlist.css';
import React from 'react';
import ReactPlayer from 'react-player';
import {PlayerIcon} from 'react-player-controls';
import Songlist from './Songlist';
import {addSongToAtmosphere, getTitle, deleteSongFromAtmosphereByUser, getSongsByAtmosphere} from '../db/db_methods';

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        if(props.atmosphereID == null) {
            props.atmosphereID = -1;
        }
        this.state = {
            atmosphereID: props.atmosphereID,
            title: props.atmosphereTitle,
            songs: [{}],
            isPlayable: true,
            isPlaying: false,
            isNotMuted: 1,
            listActive: false,
            hasPrevious: false,
            hasNext: false,
            currentSongNr: 0
        }     
        this.fetchSongs()
    }
    fetchSongs() {
        const GABIAUResult = getSongsByAtmosphere(this.state.atmosphereID, this.props.context.userId)
        GABIAUResult.then((result) => {
            const finalResult = result.data[0].result.db_result;
            if (finalResult.length > 0) {
                this.setState({
                    songs: finalResult
                })
            } else {
                this.setState({
                    songs: [{}]
                })
            }
        })
    }
    handleMuteClick() {
        if(this.state.isNotMuted === 1) {
            this.setState ({
                isNotMuted: 1
            }) 
        } else {
            this.setState ({
                isNotMuted: 0
            })
        }
    }
    handleListClick() {
        this.setState({
            listActive: !this.state.listActive
        })
    }
    handlePreviousClick() {
        if(0 < this.state.currentSongNr) {
            this.setState({
                currentSongNr: this.state.currentSongNr-1
            })
        }
    }
    handlePlayClick() {
        this.setState({
            isPlaying: true
        })
    }
    handlePauseClick() {
        this.setState({
            isPlaying: false
        })
    }
    handleNextClick() {
        if(this.state.songs.length-1 > this.state.currentSongNr) {
            this.setState({
                currentSongNr: this.state.currentSongNr+1
            })
        }
    }
    handleChangeSong = (songId) => {
        this.setState({
            currentSongNr: songId
        })
        this.handleListClick()
    }
    handleAddSong() {
        const url = prompt("Enter song URL", "Enter URL here");
        const titlePromise = getTitle(url);
        titlePromise.then((result) => {
            const addSongToAtmospherePromise = addSongToAtmosphere(this.state.atmosphereID, result.title, url)
            addSongToAtmospherePromise.then((result) => {
                this.fetchSongs()
            })
        })
    }
    handleRemoveSong = (i) => {
        var shouldDelete = window.confirm("Are you sure you want to delete this song?");        
        if(shouldDelete) {
            const deleteSongPromise = deleteSongFromAtmosphereByUser(this.props.context.userId, this.state.atmosphereID, this.state.songs[i].id)
            deleteSongPromise.then((result) => {
                this.fetchSongs()
            })
        }
    }
    render() {
        const config = {
            youtube: {
              playerVars: { controls: 0 }
            }
        }        
        return (
            <div id="playlist">
                <h2>{this.state.title}</h2>
                <button className="smallButton" onClick={() => this.handleAddSong()}>+</button>
                {this.state.listActive ? <Songlist 
                    width="420px"
                    height="240px"
                    songs={this.state.songs}
                    onSelectSong={this.handleChangeSong}
                    onDeleteSong={this.handleRemoveSong}
                /> : <ReactPlayer 
                    url={this.state.songs[this.state.currentSongNr].href_link}
                    width="420px"
                    height="240px"
                    loop={true} 
                    config={config}
                    volume={this.state.isNotMuted}
                    playing={this.state.isPlaying}
                    onPlay={() => this.handlePlayClick()}
                    onPause={() => this.handlePauseClick()}
                />
        }
                <svg onClick={() => this.handleListClick()} width="32px" height="32px" className="svg-icon" viewBox="0 0 20 20">
                    <path d="M2.25,12.584c-0.713,0-1.292,0.578-1.292,1.291s0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291S2.963,12.584,2.25,12.584z M2.25,14.307c-0.238,0-0.43-0.193-0.43-0.432s0.192-0.432,0.43-0.432c0.238,0,0.431,0.193,0.431,0.432S2.488,14.307,2.25,14.307z M5.694,6.555H18.61c0.237,0,0.431-0.191,0.431-0.43s-0.193-0.431-0.431-0.431H5.694c-0.238,0-0.43,0.192-0.43,0.431S5.457,6.555,5.694,6.555z M2.25,8.708c-0.713,0-1.292,0.578-1.292,1.291c0,0.715,0.579,1.292,1.292,1.292c0.713,0,1.292-0.577,1.292-1.292C3.542,9.287,2.963,8.708,2.25,8.708z M2.25,10.43c-0.238,0-0.43-0.192-0.43-0.431c0-0.237,0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43C2.681,10.238,2.488,10.43,2.25,10.43z M18.61,9.57H5.694c-0.238,0-0.43,0.192-0.43,0.43c0,0.238,0.192,0.431,0.43,0.431H18.61c0.237,0,0.431-0.192,0.431-0.431C19.041,9.762,18.848,9.57,18.61,9.57z M18.61,13.443H5.694c-0.238,0-0.43,0.193-0.43,0.432s0.192,0.432,0.43,0.432H18.61c0.237,0,0.431-0.193,0.431-0.432S18.848,13.443,18.61,13.443z M2.25,4.833c-0.713,0-1.292,0.578-1.292,1.292c0,0.713,0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291C3.542,5.412,2.963,4.833,2.25,4.833z M2.25,6.555c-0.238,0-0.43-0.191-0.43-0.43s0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431S2.488,6.555,2.25,6.555z"></path>
				</svg>
                <PlayerIcon.Previous onClick={() => this.handlePreviousClick()} width={32} height={32} />
                {this.state.isPlaying ? <PlayerIcon.Pause onClick={() => this.handlePauseClick()} width={32} height={32} /> 
                : <PlayerIcon.Play onClick={() => this.handlePlayClick()} width={32} height={32} />}
                <PlayerIcon.Next onClick={() => this.handleNextClick()} width={32} height={32} />
                {this.state.isNotMuted ?  <PlayerIcon.SoundOn onClick={() => this.handleMuteClick()} width={32} height={32} />
                : <PlayerIcon.SoundOff onClick={() => this.handleMuteClick()} width={32} height={32} />}
            </div>
        );
    }
}

export default Playlist;

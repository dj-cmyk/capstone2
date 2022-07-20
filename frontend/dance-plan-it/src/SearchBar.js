import React, {useState, useEffect, useContext} from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import { Container, Form, Input } from 'reactstrap';
import Player from './Player';
import TokenContext from './TokenContext';

const spotifyApi = new SpotifyWebApi({
    clientId: "a8701db3365941aea943d79b1b826150",
  })
  

const SearchBar = ({getURI}) => {

    const accessToken = useContext(TokenContext)

    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
      }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])
    
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
    
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
          if (cancel) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            })
          )
        })
    
        return () => (cancel = true)
      }, [search, accessToken])

      

    return(
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form>
        <Input 
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
        />
      </Form>
      {searchResults ? <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      : ""}
      {playingTrack ? <button onClick={() => getURI(playingTrack.uri)} className="btn btn-outline-primary btn-lg">Click to add URI to form</button> : ""}
      
      <div>
        <Player accessToken={accessToken} uri={playingTrack?.uri} />
      </div>
    </Container>
    )
}

export default SearchBar;
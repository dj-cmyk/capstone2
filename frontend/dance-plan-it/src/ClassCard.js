import React, {useContext, useEffect} from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import Player from "./Player";
import SpotifyWebApi from "spotify-web-api-node"
import "./ExerciseCard.css";
import TokenContext from "./TokenContext";


const spotifyApi = new SpotifyWebApi({
  clientId: "a8701db3365941aea943d79b1b826150",
})


function ClassCard({ classExercise }) {
    const accessToken = useContext(TokenContext)


    useEffect(() => {
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
    }, [accessToken])


  
  return (
    
      <Card className="Card">
        <CardBody className="Card-Body">

          <CardTitle className="Card-Title">
            {classExercise.name}
          </CardTitle>

          <CardText className="Card-Text">
            {classExercise.description}
          </CardText>
          {classExercise.hasProp ? 
                <p className="Card-SubText">
                  <b>Prop Description:</b> {classExercise.propDescription}
                </p> 
                : ""}
                {classExercise.notes ? 
                <p className="Card-SubText">
                <b>Notes:</b> {classExercise.notes}
              </p> 
              : ""}
                <section className="Section">
            <Player accessToken={accessToken} uri={classExercise.spotifyURI}/>
            </section>
        </CardBody>
      </Card>
    
  );
}

export default ClassCard;
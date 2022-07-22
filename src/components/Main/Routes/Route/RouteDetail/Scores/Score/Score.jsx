import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { getAllScores, reset} from '../../../../../../../features/scores/scoresSlice';
import { Avatar } from "antd";



const Score = () => {
    const dispatch = useDispatch();
  const { scores,newScore } = useSelector((state) => state.scores);

  const getScoresAndReset = async () => {
    await dispatch(getAllScores());
    dispatch(reset())
  };

  useEffect(() => {
    getScoresAndReset();
  }, [getAllScores,newScore]);

 const scoresPint=scores.scores?.map(el=>{return(
    <div>
    <span>Puntuación:{el.score}</span>
    <span>Hecha por:{el.userId.name}</span>
    <Avatar src={URL + "/users/" + el.userId?.imagepath} alt=""/>
    </div>
 )})

  return (
    <>
   {scoresPint}
    </>
  )
}

export default Score
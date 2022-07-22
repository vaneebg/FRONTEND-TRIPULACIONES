import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { getAllScores, reset, deleteScore} from '../../../../../../../features/scores/scoresSlice';

import { Avatar,Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";


const URL = process.env.REACT_APP_URL;
const userLocal = JSON.parse(localStorage.getItem("user"));


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

 const scoresPint=scores.scores?.map(el=>{
    console.log(el.userId.imagepath)
    return(
    <div>
    <span>Puntuación:{el.score}</span>
    <span>Hecha por:{el.userId.name}</span>
    <Avatar src={URL + "/users/" + el.userId?.imagepath} alt=""/>
    {el.userId._id === userLocal.user._id ? <>  <Popconfirm
              placement="rightTop"
              title="Seguro que quieres borrar esta puntuación?"
              onConfirm={() => dispatch(deleteScore(el._id))}
              okText="Yes"
              cancelText="No"
            >
              <button className="btnModalC"><DeleteOutlined /></button>
            </Popconfirm> </> : null}
    </div>
 )})

  return (
    <>
   {scoresPint}
    </>
  )
}

export default Score
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { getAllScores, reset, deleteScore } from '../../../../../../../features/scores/scoresSlice';

import { Avatar, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { myInfo } from '../../../../../../../features/auth/authSlice';


const URL = process.env.REACT_APP_URL;


const Score = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { scores, newScore } = useSelector((state) => state.scores);
  const { route } = useSelector((state) => state.routes);

  const { user } = useSelector((state) => state.auth)
  const getScoresAndReset = async () => {
    await dispatch(getAllScores());
    dispatch(reset())
  };

  console.log("user", user)
  useEffect(() => {
    getScoresAndReset();

  }, [getAllScores, newScore]);
  useEffect(() => {
    dispatch(myInfo());
  }, []);

  console.log("route",route._id)
  const scoresPint = scores.scores?.map(el => {  
console.log("scores",el.routeId) 
if(route._id===el.routeId) {
    return (
      <div>
        <span>Puntuación:{el.score}</span>
        <span>Hecha por:{el.userId.name}</span>
        <Avatar src={URL + "/users/" + el.userId?.imagepath} alt="" />
        {el.userId._id === user._id ? <>  <Popconfirm
          placement="rightTop"
          title="Seguro que quieres borrar esta puntuación?"
          onConfirm={() => dispatch(deleteScore(el._id))}
          okText="Yes"
          cancelText="No"
        >
          <button className="btnModalC"><DeleteOutlined /></button>
        </Popconfirm> </> : null}
      </div>
    )
        }else{
         <div></div>
        }
  })

  return (
    <>
      {scoresPint}
    </>
  )
}

export default Score
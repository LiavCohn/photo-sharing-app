import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
// import AlbumList from "../components/AlbumList";

const  Home = () =>{
  const { user } = useUser();

  return (
    <div>This is the home page!</div>
  );
}

export default Home


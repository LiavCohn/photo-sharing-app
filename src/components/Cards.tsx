import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import "../styles/Card.css"

interface Picture {
  _id: string;
  name: string;
  caption?: string;
  public: boolean; // Is it publicly visible?
  userId: Id<"users">;
  image: Id<"_storage">; // Convex file reference
  albumId?: Id<"albums">; // Optional album
  createdAt: number; // Unix timestamp or Date.now()
    username: string;
    url: string | null;
}

interface Album {
    _id: string;
    title: string;
    description?: string;
    userId: Id<"users">;
    public: boolean;
    createdAt: number;
}

interface CardProps {
    type: "album" | "picture";
    items: Album[] | Picture[]
}


const Cards = ({ type ,items}: CardProps) => {
    
    return (
        <>      
            {items.map((item) => {
                if (type == 'album') {
                    const album = item as Album;
                    return (
                        <div key={album._id} className="card-album">
                        <div className="card-menu">⋮</div> 
                        <div className="card-content">
                          <h3>{album.title}</h3>
                          <p>{album.description}</p>
                        </div>
                      </div>
                    )
                }
                else {
                    const pic = item as Picture;
                    return (
                        <div key={pic._id} className="card-picture">
                            <div className="card-menu">⋮</div> 
                            {pic.url ? (
                                <img src={pic.url} alt={pic.name} />
                            ) : (
                                <div className="image-placeholder">Image not available</div>
                            )}
                            <div className="card-content">
                            <h3>{pic.name}</h3>
                            <p>{pic.caption}</p>
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )


}

export default Cards;
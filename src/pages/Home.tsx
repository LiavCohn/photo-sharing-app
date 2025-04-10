import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "../styles/Home.css"
import { Link } from "react-router-dom";
import { Id } from "../../convex/_generated/dataModel";


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
}


const  Home = () =>{
  const { user } = useUser();

  const pictures = useQuery(api.pictures.listPictures)
  const albums = useQuery(api.albums.getAlbumsByUser)
  const sharedContent = useQuery(api.sharedContent.getSharedContent)


  if (!user || pictures === undefined || albums === undefined || sharedContent === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <section>
        <h2>Your Pictures</h2>
        {pictures.length === 0 ? (
          <p>No pictures yet. <Link to="/upload">Upload one</Link>.</p>
        ) : (
            <div className="card-container">
              {pictures.map(pic => (
              <div key={pic._id} className="card">
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
              ))}

          </div>
        )}
      </section>

      <section>
        <h2>Your Albums</h2>
        {albums.length === 0 ? (
          <p>No albums yet. <Link to="/create-album">Create one</Link>.</p>
        ) : (
          <div className="card-container">
            {albums.map(album => (
              <div key={album._id} className="card">
                <div className="card-content">
                  <h3>{album.title}</h3>
                  <p>{album.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Shared With You</h2>
        <p>Nothing shared with you yet.</p>
        {/* {sharedContent.length === 0 ? (
          <p>Nothing shared with you yet.</p>
        ) : (
          <div className="card-container">
            {sharedContent.map(item => (
              <div key={item._id} className="card">
                <div className="card-content">
                  <h3>{item.contentType}</h3>
                  {item. && <p>{item.caption}</p>}
                  <p>Shared by: {item.sharedBy}</p>
                  {item.url && <img src={item.url} alt={item.name} />}
                </div>
              </div>
            ))}
          </div>
        )} */}
      </section>
    </div>
  );
}

export default Home


import { FormEvent, useState } from "react";
import "../styles/CreateAlbum.css";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {useNavigate} from "react-router-dom"

const CreateAlbumForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
  const createAlbum = useMutation(api.albums.createAlbum);

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
    if (!title.trim()) return;

      try {
          await createAlbum({ title, description, public: isPublic });
          alert("Album was created successfully!")
          navigate(-1)
        
      } catch (error) {
          console.log({error})
          alert("Failed to create an album.")
          return
      }
      finally {
          setLoading(false)
      }
    setTitle("");
    setDescription("");
  };

    return (
        <div className="content-container">
            <div className="submit-container">
                <form className="album-form" onSubmit={handleSubmit}>
                <h1>Create New Album</h1>
                <input
                    type="text"
                    placeholder="Album Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Album Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>
                    <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={e => setIsPublic(e.target.checked)}
                    />
                    Public
                </label>
                    <button type="submit">{loading ? "Creating your album..." : "Create" }</button>
                </form>
                
            </div>
            
        </div>
  );
};

export default CreateAlbumForm;

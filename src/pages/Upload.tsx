// pages/Upload.tsx
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import type { Id } from "../../convex/_generated/dataModel";
import { v } from "convex/values";
import { FaImage } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { useNavigate } from "react-router-dom"

import "../styles/Upload.css";

    // name: v.string(),
    // caption: v.optional(v.string()),
    // image: v.id("_storage"),
    // public: v.boolean(),
    // albumId: v.optional(v.id("albums")), 


interface PictureProps {
  name: string;
  caption?: string;
  image: Id<"_storage">;
  public: boolean;
  albumId?: Id<"albums">

}


const Upload = () => {
  const [image, setSelectedImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [albumId, setAlbumId] = useState<Id<"albums"> | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false)
  const albums = useQuery(api.albums.getAlbumsByUser); // ← you'll need this query
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const generateUploadUrl = useMutation(api.image.generateUploadUrl);
  const savePicture = useMutation(api.pictures.savePicture);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !user) return;

    try {
      setSubmitting(true)
      const postUrl = await generateUploadUrl();
      const res = await fetch(postUrl, {
        method: "POST",
        body: (() => {
          const data = new FormData();
          data.append("file", image);
          return data;
        })(),
      });
  
      const { storageId } = await res.json();
  
      await savePicture({
        name,
        caption,
        image: storageId,
        public: isPublic,
        albumId: albumId,
      });
  
      alert("Picture uploaded!");
      navigate("/home")
      
    } catch (error) {
      console.log({error})
      alert("Failed to upload picture. Please try again")
    }
    finally {
      setSubmitting(false)
    }
  };


  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 5MB")
            return
        }
        
        setSelectedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }
}
  const handleRemoveImage = () => {
  setSelectedImage(null)
  setImagePreview(null)
}
  return <div className="content-container">
  <div className="submit-container">
      <h1>Upload a Picture</h1>
      <form className="submit-form" onSubmit={handleSubmit}>
          <input type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="submit-title" maxLength={50} />
          <textarea placeholder="Captions (Optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="submit-body" />
          <div className="media-input-container">
              <label className="image-upload-label">
                  <FaImage className="image-icon"/>
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageSelect} style={{display:"none"}}></input>
              </label>
              {imagePreview && <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview"></img>
                  <button type="button" className="remove-image-button" onClick={handleRemoveImage}><IoMdClose/></button>
              </div>}
        </div>
          <label>
        <input
          type="checkbox"
           checked={isPublic}
           onChange={e => setIsPublic(e.target.checked)}
        />
        Public
     </label>
      {albums && albums.length > 0 && (
        <select
          value={albumId ?? ""}
          onChange={e => setAlbumId(e.target.value ? (e.target.value as Id<"albums">) : undefined)}
        >
          <option value="">Select an album (optional)</option>
          {albums.map(album => (
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
          ))}
        </select>
      )}
          <div className="submit-actions">
              <button type="button" onClick={() => navigate(-1)} className="back-button" disabled={submitting}>Cancel</button>
              <button type="submit" className="submit-button" disabled={submitting || !name.trim()}>{ submitting ? "Uploading..." : "Upload"}</button>

          </div>
      </form>
  </div>
</div>
};

export default Upload;

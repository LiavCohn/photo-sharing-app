// pages/Upload.tsx
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");

  const generateUploadUrl = useMutation(api.image.generateUploadUrl);
  const savePicture = useMutation(api.pictures.savePicture);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;

    // 1. Get an upload URL
    const postUrl = await generateUploadUrl();

    // 2. Upload file to that URL
    const res = await fetch(postUrl, {
      method: "POST",
      body: (() => {
        const data = new FormData();
        data.append("file", file);
        return data;
      })(),
    });

    const { storageId } = await res.json(); // Convex file ID

    // 3. Save metadata to DB
    await savePicture({
      name,
      caption,
      image: storageId,
      public: false,
    });

    alert("Picture uploaded!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload a Picture</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;

import { useState } from "react";

const ViewSongs = () => {

  const [DeletingProgress, setDeletingProgress] = useState(false)
  const [localLoading, setLocalLoading] = useState(false);

  const handleDelete = async (e, song) => {
      e.preventDefault();
      e.stopPropagation();
      const success = await deleteAudioFile(song, setLocalLoading);
      if (success) {
          const updatedSongs = await getAllAudios();
          setSongs(updatedSongs);
      }
  };

  useEffect(() => {
      const fetchSongs = async () => {
          setLocalLoading(true);
          try {
              const data = await getAllAudios();
              setSongs(data);
          } finally {
              setLocalLoading(false);
          }
      };
      fetchSongs();
  }, []);

  const getOptimizedCoverUrl = (originalUrl, width = 400, height = 400) => {
      if (!originalUrl) return originalUrl;
      if (originalUrl.includes("placehold.co")) return originalUrl;
      return originalUrl.replace("/upload/", `/upload/w_${width},h_${height},c_fill,g_auto,q_auto,f_auto/`);
  };

  if (localLoading) return <Loading />;

  return (
    <div>ViewSongs</div>
  )
}

export default ViewSongs
import YouTube from 'react-youtube';

const extractYouTubeID = (url) => {
  if (!url) return null;

  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

export const YouTubeEmbed = ({ url }) => {
  const videoId = extractYouTubeID(url);

  if (!videoId) return null;

  const opts = {
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-md">
      <div className="absolute top-0 left-0 w-full h-full">
        <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
      </div>
    </div>
  );
};

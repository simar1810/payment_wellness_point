import { getYouTubeId } from '@/helpers/utils';

export default function YtPlayer({ url }) {
  const videoId = getYouTubeId(url);
  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }
  return (
    // <div className='relative overflow-hidden aspect-[16/9]'>
    <div className='relative overflow-hidden aspect-[16/9]'>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        // className='absolute top-0 left-0 w-full h-full'
      />
    </div>
  );
};


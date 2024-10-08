import { getYouTubeId, getYouTubeThumbnailUrl } from "@/helpers/utils";
import Image from "next/image";

const YtThumbnail = ({ url, size, width = 100 }) => {
  // const YouTubeThumbnail = ({ url, size, width = 100, customClasses = "" }) => {
  const videoId = getYouTubeId(url);
  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }
  const thumbnailUrl = getYouTubeThumbnailUrl(videoId, size);
  //   return (
  //     <Image
  //       src={thumbnailUrl}
  //       alt="YouTube Thumbnail"
  //       width={width}
  //       height={100}
  //       className={customClasses}
  //     />
  //   );
  return (
    <Image
      src={thumbnailUrl}
      alt="YouTube Thumbnail"
      width={width}
      height={100}
      className={`rounded-xl`}
    />
  );
};

export default YtThumbnail;

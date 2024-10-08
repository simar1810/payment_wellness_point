import imageCompression from "browser-image-compression";

export function getYouTubeId(url) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function getYouTubeThumbnailUrl(videoId, size = "default") {
  const sizes = {
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
    mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    max: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };
  return sizes[size] || sizes["default"];
}

export async function compressFile(file, maxSize = 0.25) {
  try {
    console.log("file size before compressing => ", file.size / 1024, "kb");

    if (file.size <= 256 * 1024) {
      return file;
    }

    const options = {
      maxSizeMB: maxSize,
      useWebWorker: true,
    };

    const compressedBlob = await imageCompression(file, options);
    console.log(
      "file size after compressing => ",
      compressedBlob.size / 1024,
      "kb"
    );

    // Convert the Blob to a File
    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: file?.lastModified ?? Date.now(),
    });

    // return compressedFile;
    return compressedBlob;

    // if (compressedFile.size <= 256 * 1024) {
    //   return compressedFile;
    // } else {
    //   console.error('Compression did not reduce the image size below 256KB');
    // }
  } catch (error) {
    console.error("Error compressing image:", error);
  }
}

export function formatDateUtil(date) {
  if (!date || date.length === 0) {
    return "N/A";
  }
  const [year, month = "n/a", day = "n/a"] = date.split("-");
  return [day, month, year].join("-");
}

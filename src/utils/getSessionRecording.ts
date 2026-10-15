interface RecordingData {
  title: string;
  youtubeId?: string;
  videoTitle?: string;
  videoThumbnail?: string;
}

const getSessionRecording = (data: RecordingData) => {
  if (!data.youtubeId) return undefined;

  return {
    title: data.videoTitle ?? data.title,
    url: "https://www.youtube.com/watch?v=" + data.youtubeId,
    thumbnail:
      data.videoThumbnail ??
      "https://i.ytimg.com/vi/" + data.youtubeId + "/hqdefault.jpg",
  };
};

export default getSessionRecording;

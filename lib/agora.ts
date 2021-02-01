import AgoraRTC, {
  IAgoraRTCClient,
} from "agora-rtc-sdk-ng";

const options = {
    appId: "938de3e8055e42b281bb8c6f69c21f78",
    channel: "xlkQyYLP",
    token: "006938de3e8055e42b281bb8c6f69c21f78IAAjQj7uRd9Z6N7rQhGXGwOb0/oLqKNmgsU8VOVpN6inR+vBPHP/dTHcEAC2kj8CJMcYYAEAAQAAAAAA",
    uid: 326292,
 };

// recorder setup
let chunks = [];
 
const startCall = async (setRecorder: any) => {
  // agora setup
  const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  AgoraRTC.setLogLevel(2);

  // recorder setup
  const audioContext = new AudioContext();
  const audioDest = audioContext.createMediaStreamDestination();
  const recorder = new MediaRecorder(audioDest.stream);
  setRecorder(recorder);

  recorder.ondataavailable = (e) => {
    console.log('chunk');
    chunks.push(e.data);
  };

  recorder.onstop = (e) => {
    console.log(recorder.mimeType);
    if (chunks.length > 0) {
      const blob = new Blob(chunks, { 'type' : 'audio/webm; codecs=opus' });
      const url = URL.createObjectURL(blob);
      const fileLink = document.createElement('a');
      fileLink.href = url;
      fileLink.download = 'laterhouse.webm';
      fileLink.click();
    }
    chunks = [];
  }

  await client.join(
    options.appId,
    options.channel,
    options.token,
    options.uid
  );

  client.on("user-published", async (user, mediaType) => {
    if (
      user != undefined &&
      mediaType &&
      client &&
      client.subscribe
    ) {
      // Subscribe to a remote user
      await client.subscribe(user, mediaType);

      const remoteAudioTrack = user.audioTrack;
      remoteAudioTrack.play();

      // send to recorder destination
      const stream = new MediaStream([user.audioTrack.getMediaStreamTrack()]);
      audioContext.createMediaStreamSource(stream).connect(audioDest);
    }
  });

  return recorder;
};

export default startCall;

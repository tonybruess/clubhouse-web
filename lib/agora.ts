import AgoraRTC, {
  IAgoraRTCClient,
} from "agora-rtc-sdk-ng";

const options = {
    appId: "",
    channel: "",
    token: "",
    uid: 0
 };

const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// recorder setup
const audioContext = new AudioContext();
const audioDest = audioContext.createMediaStreamDestination();
const recorder = new MediaRecorder(audioDest.stream);

const startCall = async () => {
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
      console.log(`subscribed to ${user.uid}`);

      const remoteAudioTrack = user.audioTrack;
      remoteAudioTrack.play();

      // send to recorder destination
      const stream = new MediaStream([user.audioTrack.getMediaStreamTrack()]);
      audioContext.createMediaStreamSource(stream).connect(audioDest);
    }
  });

  client.on("user-unpublished", user => {
    console.log(`goodbye to ${user.uid}`)
  });
};

export { startCall, client, recorder };

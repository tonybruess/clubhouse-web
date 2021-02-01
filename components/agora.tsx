import { useState } from 'react'
import startCall from '../lib/agora'

enum ICallState {
  Off,
  Listening,
  Recording,
}

export default function Agora({}) {
  const [callState, setCallState] = useState(ICallState.Off);
  const [recorder, setRecorder] = useState(null);

  const join = () => {
    setCallState(ICallState.Listening);
    startCall(setRecorder);
  }

  const startRecording = () => {
    setCallState(ICallState.Recording);
    recorder.start();
  }

  const stopRecording = () => {
    setCallState(ICallState.Listening);
    recorder.stop();
  }

return (<>
    {callState == ICallState.Off &&
      <button
      className="bg-blue-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
      onClick={join}
    >
      Join
    </button>}
    {callState == ICallState.Listening &&
      <button
        className="bg-red-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
        onClick={startRecording}
      >
        Record
      </button>}
    {callState == ICallState.Recording &&
      <button
        className="bg-red-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
        onClick={stopRecording}
      >
        Save
      </button>}
  </>);
}
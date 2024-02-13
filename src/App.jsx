import {
  CallingState,
  CancelCallButton,
  SpeakerLayout,
  SpeakingWhileMutedNotification,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = 'mmhfdzb5evj2'; // the API key can be found in the "Credentials" section
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRHVyZ2UiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0R1cmdlIiwiaWF0IjoxNzA3Nzc4NDUwLCJleHAiOjE3MDgzODMyNTV9.CLv5VWl-PcdP4dL7ABvrTSFEtIwigs03xvOe0-O4C1I'; // the token can be found in the "Credentials" section
const userId = 'Durge'; // the user id can be found in the "Credentials" section
const callId = 'oiJzHcC4y4Uy'; // the call id can be found in the "Credentials" section

const user = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout ParticipantViewUIBar={null} participantsBarPosition='bottom' />
      <CallButtons />
    </StreamTheme>
  );
};

export const CallButtons = ({ onLeave }) => (
  <div className="str-video__call-controls">
    <SpeakingWhileMutedNotification />
    <ToggleAudioPublishingButton caption={null}/>
    <CancelCallButton onLeave={onLeave} />
    <ToggleVideoPublishingButton caption={null}/>
  </div>
);

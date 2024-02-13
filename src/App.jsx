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
import axios from 'axios';
import { useEffect, useState } from 'react';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRHVyZ2UiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0R1cmdlIiwiaWF0IjoxNzA3Nzc4NDUwLCJleHAiOjE3MDgzODMyNTV9.CLv5VWl-PcdP4dL7ABvrTSFEtIwigs03xvOe0-O4C1I';
const userId = 'Durge';

const user = {
  id: userId,
  name: Date.now().toString(),
  image: 'https://i.pinimg.com/736x/25/3a/e9/253ae999cdcdac72fb4006209242f40c.jpg',
};

const client = new StreamVideoClient({ apiKey, user, token });

export default function App() {
  
  const [callId, setCallId] = useState(null);

  useEffect(() => {
    const fetchCallId = async () => {
      try {
        const response = await axios.post('http://192.168.0.252:4000/join', {
          userId: user.name,
          // Add any other necessary data to the request body
        });

        // Assuming the response contains the correct field for callId
        const newCallId = response.data.id;

        // Set the newCallId in the state
        setCallId(newCallId);

      } catch (error) {
        console.error('Error fetching callId:', error);
      }
    };

    // Call the function to fetch the callId
    fetchCallId();
  }, []); // Run only once on component mount

  if (!callId) {
    setCallId('asdasd')
    return <div>Loading...</div>;
  }

  const call = client.call('default', callId);
  call.join({ create: true });

   const MyUILayout = () => {
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();
  
    if (callingState !== CallingState.JOINED) {
      return <div>Loading...</div>;
    }
  
    const handleLeaveCall = async () => {
      try {
        setCallId(Date.now().toString())
        await axios.post('http://192.168.0.252:4000/leave', {
          userId: user.name,
          // Add any other necessary data to the request body
        });
      } catch (error) {
        console.error('Error leaving call:', error);
      }
    }
  
    return (
      <StreamTheme>
        <SpeakerLayout ParticipantViewUIBar={null} participantsBarPosition='bottom' />
        <CallButtons onLeave={() => handleLeaveCall()}/>
      </StreamTheme>
    );
  };
  
   const CallButtons = ({ onLeave }) => {
    
    
    return (
    <div className="str-video__call-controls">
      <SpeakingWhileMutedNotification />
      <ToggleAudioPublishingButton caption={null}/>
      <CancelCallButton onLeave={onLeave} />
      <ToggleVideoPublishingButton caption={null}/>
    </div>
  )};
  

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}


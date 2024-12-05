import React, { useState, useEffect, useRef } from 'react';
import { Stack, Typography, Avatar, IconButton, Divider, TextField, Modal, Box, Card } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ChatBubbleComponent from './common/ChatBubble';
import GradientButton from './common/GradientButton';
import SideStack from './common/SideStack';
import html2canvas from 'html2canvas';
import getFormattedDate from './utils/dateConvert';

const BASE_URL = 'https://pinder-90gf.onrender.com';

function Home() {
  const [profiles, setProfiles] = useState([]); 
  const [matchedCat, setMatchedCat] = useState(null); 
  const [curProfile, setCurProfile] = useState(null); 
  const [messages, setMessages] = useState([]); 
  const [textValue, setTextValue] = useState(''); 
  const [messaging, setMessaging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const chatContainerRef = useRef(null); 
  const modalRef = useRef(null); 

  const defaultProfiles = React.useMemo(
    () => [
      {
        name: 'Meowra',
        job: 'Clawyer',
        age: 22,
        location: 'Catlanta',
        filePath: `${BASE_URL}/static/images/Meowi.webp`,
        response: 'L rizz',
        message: 'I have claw-nly eyes for someone else.',
      },
      {
        name: 'Whiskerette',
        job: 'Meowchanical Engineer',
        age: 23,
        location: 'Meowdrid',
        filePath: `${BASE_URL}/static/images/Purrina.webp`,
        response: 'Paw-lease, that was awful.',
        message: 'You’ve been purr-manently unmatched.',
      },
      {
        name: 'Purrthy',
        job: 'Furmer',
        age: 23,
        location: 'Meowbourne',
        filePath: `${BASE_URL}/static/images/Purrthy.webp`,
        response: 'That was a purr-etty bad attempt.',
        message: "Are you a furball? Because you've got me coughing up my feelings.",
      },
      {
        name: 'Purrlie',
        job: 'Meowccountant',
        age: 23,
        location: 'Purris',
        filePath: `${BASE_URL}/static/images/Purrlie.webp`,
        response: "You've got to be kitten me",
        message: "Are you a cat? Because you've purr-manently caught my attention.",
      },
    ],
    []
  );

  useEffect(() => {
    fetch(`${BASE_URL}/profiles`)
      .then((res) => res.json())
      .then((data) =>
        setProfiles(
          data.map((profile) => ({
            ...profile,
            filePath: profile.filePath || `${BASE_URL}/static/images/${profile.name}.webp`,
          }))
        )
      )
      .catch((err) => {
        console.error('Error fetching profiles:', err);
        setProfiles([]);
      });
  }, []);

  const handleScreenshot = () => {
    if (modalRef.current) {
      const images = modalRef.current.querySelectorAll('img');
      const imagePromises = Array.from(images).map(
        (img) =>
          new Promise((resolve, reject) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = reject;
            }
          })
      );
  
      Promise.all(imagePromises)
        .then(() => {
          html2canvas(modalRef.current, {
            useCORS: true, 
            scale: 2, 
          }).then((canvas) => {
            const link = document.createElement('a');
            link.download = 'catinder_match.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
          });
        })
        .catch((error) => {
          console.error('Failed to load some images:', error);
        });
    }
  };
  

  const handleLike = () => {
    const currentProfile = profiles[currentIndex];
    if (currentProfile) {
      setMatchedCat({
        ...currentProfile,
        filePath: `${BASE_URL}/static/images/${currentProfile.name}.webp`,
      });
      setModalOpen(true);
    }
  };

  const handleDislike = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setMessaging(true);
    setCurProfile(matchedCat);
    setMessages([{ text: 'meowww', sender: false }]);
  };

  const handleProfileClick = (profile) => {
    setCurProfile(profile);
    if (profile === matchedCat) {
      setMessages([{ text: 'meowww', sender: false }]);
    } else {
      setMessages([
        { text: profile.message, sender: true },
        { text: profile.response, sender: false },
        { text: `${profile.name} has unmatched with you.`, isSystemMessage: true },
      ]);
    }
    setTextValue('');
  };

  const handleSendMessage = (event) => {
    if (!textValue.trim() || curProfile !== matchedCat) return;
    if (event.key === 'Enter' || event.type === 'click') {
      const newMessages = [...messages, { text: textValue, sender: true }];
      setMessages(newMessages);
      setTextValue('');

      setTimeout(() => {
        const typingMessages = [...newMessages, { text: '...', sender: false }];
        setMessages(typingMessages);

        setTimeout(() => {
          const finalMessages = [...newMessages, { text: 'meowww', sender: false }];
          setMessages(finalMessages);

          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, 2000);
      }, 1000);
    }
  };

  return (
    <Stack direction="row" sx={{ height: '100vh', overflow: 'hidden', background: 'linear-gradient(135deg, #0F2D2E, #102F2F)' }}>
      {messaging && (
        <Stack width="25%" minWidth="300px" bgcolor="#171717" p={2} sx={{ overflowY: 'auto' }}>
          <Stack 
            direction="row" 
            alignItems="center" 
            sx={{ 
              background: 'linear-gradient(135deg, #0F2D2E, #102F2F)', 
              p: 2 
            }}
          >
            <Avatar alt="$PINDER" src={`${BASE_URL}/static/images/pump.png`} sx={{ width: 50, height: 50 }} />
            <Typography fontWeight={600} ml={2}>
              $PINDER
            </Typography>
            <Box flex={1} />
          </Stack>

          <Stack mt={2}>
            {matchedCat && (
              <Box onClick={() => handleProfileClick(matchedCat)}>
                <SideStack name={matchedCat.name} message="meowww" image={matchedCat.filePath} main />
              </Box>
            )}

            {defaultProfiles
              .filter((profile) => profile.name !== matchedCat?.name)
              .map((profile, index) => (
                <Box key={index} onClick={() => handleProfileClick(profile)}>
                  <SideStack name={profile.name} message={profile.response} image={profile.filePath} />
                </Box>
              ))}
          </Stack>
        </Stack>
      )}

      <Stack width="50%" direction="column" sx={{ bgcolor: '#1b1b1b' }}>
        {messaging ? (
          <>
            <Stack direction="row" alignItems="center" px={2} py={1} bgcolor="#202020">
              <Avatar
                src={
                  curProfile === matchedCat
                    ? `${BASE_URL}/static/images/${curProfile?.name}.webp`
                    : curProfile?.filePath
                }
                alt={curProfile?.name}
                sx={{ width: 50, height: 50, border: '2px solid white' }}
              />
              <Typography ml={2}>
                {curProfile === matchedCat
                  ? `You matched with ${curProfile?.name} on ${getFormattedDate(Date.now())}`
                  : curProfile?.name}
              </Typography>
            </Stack>
            <Divider />

            <Stack ref={chatContainerRef} sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#1b1b1b' }}>
              {messages.map((msg, index) =>
                msg.isSystemMessage ? (
                  <Typography
                    key={index}
                    sx={{ color: '#f5f5f7', textAlign: 'center', fontStyle: 'italic', mt: 2 }}
                  >
                    {msg.text}
                  </Typography>
                ) : (
                  <ChatBubbleComponent
                    key={index}
                    text={msg.text}
                    sender={msg.sender}
                    avatar={!msg.sender && curProfile?.filePath}
                  />
                )
              )}
            </Stack>

            <Divider />
            <Stack direction="row" alignItems="center" p={2} spacing={2}>
              <TextField
                fullWidth
                value={textValue}
                placeholder="Type a message..."
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={handleSendMessage}
                disabled={curProfile !== matchedCat}
              />
              <GradientButton onClick={handleSendMessage} disabled={curProfile !== matchedCat || !textValue}>
                Send
              </GradientButton>
            </Stack>
          </>
        ) : (
<Stack
  justifyContent="center"
  alignItems="center"
  sx={{
    width: '100vw', 
    height: '100vh', 
    background: 'linear-gradient(135deg, #0F2D2E, #102F2F)',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  }}
>
  <Card
    sx={{
      width: 320,
      textAlign: 'center',
      bgcolor: '#1b1d28', 
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: 5,
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: 400,
        overflow: 'hidden', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b1d28', 
      }}
    >
      <img
        src={`${BASE_URL}/static/images/${profiles[currentIndex]?.name}.webp`}
        alt={profiles[currentIndex]?.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', 
        }}
      />
    </Box>

    <Box sx={{ padding: 2 }}>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          mb: 1,
        }}
      >
        {profiles[currentIndex]?.name}, {profiles[currentIndex]?.age}
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#a5a5a5' }}>
        {profiles[currentIndex]?.job} | {profiles[currentIndex]?.location}
      </Typography>
    </Box>

    <Stack
  direction="row"
  justifyContent="center"
  spacing={2} 
  sx={{
    marginTop: -0.05, 
    paddingBottom: 2, 
    paddingLeft: 1,
    paddingRight: 1, 
  }}
>
  <IconButton
    onClick={handleDislike}
    sx={{
      width: 50,
      height: 50,
      background: 'linear-gradient(135deg, #0F2D2E, #102F2F)',
      color: 'white',
      borderRadius: '50%',
      '&:hover': {
        background: 'linear-gradient(135deg, #102F2F, #0F2D2E)',
        boxShadow: '0 6px 15px rgba(0, 255, 204, 0.4)',
      },
    }}
  >
    <CancelRoundedIcon sx={{ fontSize: 30 }} />
  </IconButton>

  <IconButton
    onClick={handleLike}
    sx={{
      width: 50,
      height: 50,
      background: 'linear-gradient(135deg, #0F2D2E, #102F2F)', 
      color: 'white',
      borderRadius: '50%',
      '&:hover': {
        background: 'linear-gradient(135deg, #102F2F, #0F2D2E)',
        boxShadow: '0 6px 15px rgba(0, 255, 204, 0.4)',
      },
    }}
  >
    <FavoriteRoundedIcon sx={{ fontSize: 30 }} />
  </IconButton>
</Stack>

  </Card>
</Stack>

        )}
      </Stack>

      {messaging && curProfile && (
        <Stack width="25%" bgcolor="#171717" p={3} sx={{ overflowY: 'auto' }}>
          <img
            src={
              curProfile === matchedCat
                ? `${BASE_URL}/static/images/${curProfile?.name}.webp`
                : curProfile?.filePath
            }
            alt={curProfile?.name}
            style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
          />
          <Typography variant="h5" fontWeight="bold" color="white">
            {curProfile?.name}, {curProfile?.age}
          </Typography>
          <Typography variant="body1" color="gray" mb={1}>
            {curProfile?.job}
          </Typography>
          <Typography variant="body1" color="gray" mb={1}>
            {curProfile?.location}
          </Typography>
          <Typography variant="body1" color="gray">
            26 miles away
          </Typography>
        </Stack>
      )}

<Modal open={modalOpen} onClose={handleModalClose} disableScrollLock>
  <Box
    ref={modalRef}
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '72%', 
      maxWidth: '340px', 
      height: 'auto',
      p: 2, 
      bgcolor: '#1b1d28',
      borderRadius: 8,
      textAlign: 'center',
      boxShadow: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <img
        src={`${BASE_URL}/static/images/catinder.png`}
        alt="Catinder Logo"
        style={{ width: '32px', height: 'auto' }} 
      />
      <Typography sx={{ fontWeight: 600, fontSize: 22, color: '#f5f5f7', fontFamily: 'Arial, sans-serif' }}>
        Pinder
      </Typography>
    </Stack>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
        mb: 2,
      }}
    >
      <img
        src={`${BASE_URL}/static/images/${matchedCat?.name}.webp`}
        alt={matchedCat?.name}
        style={{
          width: '100%',
          maxWidth: '100%',
          maxHeight: '60%', 
          objectFit: 'contain',
          borderRadius: 8,
        }}
      />
    </Box>

    <Typography variant="h6" fontWeight="bold" mb={2}>
      You matched with {matchedCat?.name}!
    </Typography>

      <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={2}
    sx={{
      marginTop: -1, 
    }}
  >
    <GradientButton startIcon={<QuestionAnswerRoundedIcon />} onClick={handleModalClose}>
      Start Chatting
    </GradientButton>
    <IconButton
      onClick={handleScreenshot}
      sx={{
        background: 'linear-gradient(135deg, #0F2D2E, #102F2F)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #102F2F, #0F2D2E)',
          boxShadow: '0 6px 15px rgba(0, 255, 204, 0.4)',
        },
      }}
    >
    <CameraAltOutlinedIcon sx={{ fontSize: 24 }} />
  </IconButton>
</Stack>

  </Box>
</Modal>


    </Stack>
  );
}

export default Home;

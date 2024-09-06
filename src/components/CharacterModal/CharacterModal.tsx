import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { ApiResponseHomeworld, Character } from '@/src/types/types';
import { formatDate } from '@/src/utils/helpers';
import { fetchHomeworld } from '@/src/utils/api';
import InfoItem from '../InfoItem/InfoItem';
import LinearLoadingIndicator from '../LinearLoadingIndicator/LinearLoadingIndicator';

const modalBoxStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  textWrap: 'no-wrap',
  overflowY: 'auto',
  bgcolor: '#241F1F',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type CharacterModalProps = {
  open: boolean;
  closeCharacterModal: () => void;
  character: Character | null;
};

const CharacterModal = ({open, closeCharacterModal, character}: CharacterModalProps) => {
  
const [homeworldData, setHomeWorldData] = useState<ApiResponseHomeworld | null>(null);
  
const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (character?.homeworld) {
      setLoading(true);
      try {
        const data = await fetchHomeworld(character.homeworld);
        setHomeWorldData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [character]);

  useEffect(() => {
    if (character) {
      fetchData();
    }
  }, [character, fetchData]);

  return (
    <Modal
      open={open}
      onClose={closeCharacterModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          ...modalBoxStyles,
        }}
      >
        <Button
          onClick={closeCharacterModal}
          style={{ position: 'fixed', top: 0, right: 0 }}
        >
          &times;
        </Button>
        <h1
          data-testid='character-modal-header'
          className='text-white font-bold text-center text-xl mb-10'
        >
          {character?.name}
        </h1>
        <div className='items-center justify-center'>
          <div>
            <h2 className='text-yellow-400 mb-4 font-bold'>Character Info</h2>
            <div className='mb-2'>
              <InfoItem label='Height' value={character?.height} />
              <InfoItem label='Mass' value={character?.mass} />
              <InfoItem label='Birth Year' value={character?.birth_year} />
              <InfoItem
                label='Date Created'
                value={formatDate(character?.created ?? '')}
              />
              <InfoItem
                label='Number of Films'
                value={`${character?.films.length}`}
              />
            </div>

            <h2 className='text-yellow-400 mb-4 font-bold'>Homeworld Info</h2>

            {loading ? (
              <LinearLoadingIndicator />
            ) : (
              <div data-testid='home-world-info'>
                <InfoItem label='Name' value={homeworldData?.name} />
                <InfoItem label='Terrain' value={homeworldData?.terrain} />
                <InfoItem label='Climate' value={homeworldData?.climate} />
                <InfoItem
                  label='Residents'
                  value={`${homeworldData?.residents?.length}`}
                />
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CharacterModal;

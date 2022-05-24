import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import getUnsplashData from './API';
import PhotoLi from './components/PhotoLi';
import PhotoUl from './components/PhotoUl';
import Skeleton from './components/Skeleton';
import { StyledParagraph, StyledTitle } from './styles/StyledText';
import { NUM_OF_PHOTO_PER_PAGE } from './utils/constants';
import { PhotoData } from './utils/PhotoData';
import ErrorDiv from './components/Error';

function App() {
  const [columnPage, setColumnPage] = useState(0);
  const [rowPage, setRowPage] = useState(1);
  const [search, setSearch] = useState('');
  const [photoList, setPhotoList] = useState<PhotoData[]>([]);
  const [error, setError] = useState<boolean>(false);

  const [target, setTarget] = useState<any>();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = (event.currentTarget[0] as HTMLInputElement).value;

    setSearch(value);
    setError(false);
    setColumnPage(0);
    setRowPage(1);
    setPhotoList([]);

    if (value) {
      try {
        setPhotoList([...Array(NUM_OF_PHOTO_PER_PAGE).fill(null)]);
        const data = await getUnsplashData(value, NUM_OF_PHOTO_PER_PAGE, rowPage);
        setPhotoList([...data.results]);
      } catch (error) {
        setError(true);
        setPhotoList([]);
      }
    }
  };

  useEffect(() => {
    const lastLiObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0 && entry.isIntersecting) {
          lastLiObserver.unobserve(target);
          setColumnPage(columnPage + 1);
        }
      });
    });
    target && lastLiObserver.observe(target);
  }, [target, rowPage]);

  useEffect(() => {
    if (columnPage) {
      setPhotoList([...photoList, ...Array(NUM_OF_PHOTO_PER_PAGE).fill(null)]);
      getUnsplashData(search, NUM_OF_PHOTO_PER_PAGE * (columnPage + 1), rowPage) //
        .then(({ results }) => {
          const newData = results.slice(-NUM_OF_PHOTO_PER_PAGE);
          const noOverlapData = newData.filter((e) => !photoList.map((k) => k.id).includes(e.id));

          setPhotoList([...photoList, ...noOverlapData]);

          noOverlapData.length < NUM_OF_PHOTO_PER_PAGE && setRowPage(rowPage + 1);
        });
    }
  }, [columnPage]);

  return (
    <>
      <Form style={{ width: '90vw' }} onSubmit={onSubmitHandler}>
        <Form.Label onClick={() => console.log(target)} style={{ fontSize: '40px' }}>
          Search Image
        </Form.Label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Form.Control type='text' placeholder='Image' />
          <Button variant='primary' type='submit'>
            Search
          </Button>
        </div>
      </Form>

      <PhotoUl>
        {error && <ErrorDiv />}
        {photoList.map((photoData, i) =>
          photoData ? (
            <PhotoLi ref={setTarget} key={i} photoData={photoData}>
              <div></div>
              <StyledTitle>{photoData.alt_description}</StyledTitle>
              <StyledParagraph>{photoData.user.name}</StyledParagraph>
            </PhotoLi> //
          ) : (
            <Skeleton key={i} />
          )
        )}
      </PhotoUl>
    </>
  );
}

export default App;

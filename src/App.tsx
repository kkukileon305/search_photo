import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import getUnsplashData from './API';
import PhotoLi from './components/PhotoLi';
import Skeleton from './components/Skeleton';
import { NUM_OF_PHOTO_PER_PAGE } from './utils/constants';
import { PhotoData } from './utils/PhotoData';

function App() {
  const [columnPage, setColumnPage] = useState(1);
  const [rowPage, setRowPage] = useState(0);
  const [search, setSearch] = useState('');
  const [photoList, setPhotoList] = useState<PhotoData[]>([]);

  const [target, setTarget] = useState<any>();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = (event.currentTarget[0] as HTMLInputElement).value;

    setColumnPage(1);
    setRowPage(0);
    setPhotoList([]);
    if (value) {
      setPhotoList([...Array(NUM_OF_PHOTO_PER_PAGE).fill(null)]);
      const data = await getUnsplashData(value, NUM_OF_PHOTO_PER_PAGE, columnPage);
      setPhotoList([...data.results]);
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
  }, [target]);

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

      <ul
        style={{
          display: 'flex', //
          flexWrap: 'wrap',
          gap: '30px',
          margin: '30px 0 0 0',
          padding: '0',
          width: '90vw',
        }}
      >
        {photoList.map((photoData, i) =>
          photoData ? (
            <PhotoLi ref={setTarget} key={i} photoData={photoData}>
              <div></div>
              <h3>{photoData.alt_description}</h3>
              <p>{photoData.user.name}</p>
            </PhotoLi> //
          ) : (
            <Skeleton key={i} />
          )
        )}
      </ul>
    </>
  );
}

export default App;

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
import Done from './components/Done';

function App() {
  const [columnPage, setColumnPage] = useState(0);
  const [rowPage, setRowPage] = useState(1);
  const [search, setSearch] = useState('');
  const [photoList, setPhotoList] = useState<PhotoData[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  // top 버튼 구현하기
  // 데이터가 없을 경우 처리하기
  // 검색시 개수가 적을 경우 무한 로딩
  const [target, setTarget] = useState<HTMLLIElement | null>();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = (event.currentTarget[0] as HTMLInputElement).value;

    setSearch(value);
    setError(false);
    setDone(false);
    setColumnPage(0);
    setRowPage(1);
    setPhotoList([]);

    if (value) {
      try {
        setPhotoList([...Array(NUM_OF_PHOTO_PER_PAGE).fill(null)]);
        const data = await getUnsplashData(value, NUM_OF_PHOTO_PER_PAGE, rowPage);

        data.results.length < NUM_OF_PHOTO_PER_PAGE && setDone(true);

        setPhotoList([...data.results]);
      } catch (error) {
        setError(true);
        setPhotoList([...photoList]);
      }
    }
  };

  useEffect(() => {
    const lastLiObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && entry.isIntersecting) {
            lastLiObserver.unobserve(target as HTMLLIElement);
            setColumnPage(columnPage + 1);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    !error && !done && target && lastLiObserver.observe(target);
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
          Search Image!
        </Form.Label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Form.Control type='text' placeholder='Image' />
          <Button variant='primary' type='submit'>
            Search
          </Button>
        </div>
      </Form>

      <PhotoUl>
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
        {done && <Done />}
        {error && <ErrorDiv />}
      </PhotoUl>
    </>
  );
}

export default App;

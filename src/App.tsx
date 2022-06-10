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
import TopBtn from './components/TopBtn';
import PhotoModal from './components/Modal';

function App() {
  const [columnPage, setColumnPage] = useState(0);
  const [search, setSearch] = useState('');
  const [realPage, setRealPage] = useState(1);
  const [photoList, setPhotoList] = useState<PhotoData[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [topBtn, setTopBtn] = useState<boolean>(false);
  const [modalState, setModalState] = useState(false);
  const [modalURL, setModalURL] = useState('');

  const [target, setTarget] = useState<HTMLLIElement | null>();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = (event.currentTarget[0] as HTMLInputElement).value;

    setSearch(value);
    setError(false);
    setDone(false);
    setColumnPage(0);
    setPhotoList([]);

    if (value) {
      try {
        setPhotoList([...Array(NUM_OF_PHOTO_PER_PAGE).fill(null)]);
        const data = await getUnsplashData(value, NUM_OF_PHOTO_PER_PAGE);

        data.results.length < NUM_OF_PHOTO_PER_PAGE && setDone(true);

        setPhotoList([...data.results]);
      } catch (error) {
        setError(true);
        setPhotoList([]);
      }
    }
  };

  const divClickHandler = (url: string) => {
    setModalURL(url);
    setModalState(true);
  };

  useEffect(() => {
    const lastLiObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && entry.isIntersecting) {
            lastLiObserver.unobserve(target as HTMLLIElement);
            console.log(1);
            setRealPage(realPage + 1);
            setColumnPage(columnPage + 1);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    !error && !done && target && lastLiObserver.observe(target);
  }, [target]);

  useEffect(() => {
    if (columnPage) {
      setPhotoList([...photoList, ...Array(NUM_OF_PHOTO_PER_PAGE).fill(null)]);
      getUnsplashData(search, NUM_OF_PHOTO_PER_PAGE * (columnPage + 1)) //
        .then(({ results }) => {
          const newData = results.slice(-NUM_OF_PHOTO_PER_PAGE);
          const noOverlapData = newData.filter((e) => !photoList.map((k) => k.id).includes(e.id));

          setPhotoList([...photoList, ...noOverlapData]);

          noOverlapData.length < NUM_OF_PHOTO_PER_PAGE && setDone(true);
        });
    }
  }, [columnPage]);

  // Scroll handler
  const scrollHandler = () => {
    const { scrollY } = window;
    scrollY > 30 ? setTopBtn(true) : setTopBtn(false);
  };

  // Top Btn Eventlistener and handler
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const topBtnHandler = () => (document.documentElement.scrollTop = 0);

  return (
    <>
      {modalState && <PhotoModal photoURL={modalURL} setModalState={setModalState} />}
      <Form style={{ width: '90vw' }} onSubmit={onSubmitHandler}>
        <Form.Label style={{ fontSize: '40px' }}>Search Image!</Form.Label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Form.Control type='text' placeholder='Image' />
          <Button variant='primary' type='submit'>
            Search
          </Button>
        </div>
      </Form>
      {topBtn && <TopBtn onClick={topBtnHandler} page={realPage} />}
      <PhotoUl>
        {photoList.map((photoData, i) =>
          photoData ? (
            <PhotoLi ref={setTarget} key={i} photoData={photoData}>
              <div onClick={() => divClickHandler(photoData.urls.regular)}></div>
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

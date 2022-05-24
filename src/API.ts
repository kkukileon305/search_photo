import { UnsplashResult } from './utils/PhotoData';

const ACCESS_KEY: string = 'iyCdUw8hjdZTKJZqBPPd3LL9QjVfjcqwH4kY0vA0LM8';

const getUnsplashData = (img: string, num: number, page: number): Promise<UnsplashResult> => {
  const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${img}&client_id=${ACCESS_KEY}&orientation=landscape&per_page=${num}`;
  return new Promise((res) => {
    setTimeout(async () => res(await (await fetch(URL)).json()), 1000);
  });
};

export default getUnsplashData;

import { UnsplashResult } from './utils/PhotoData';

const ACCESS_KEY: string = 'iyCdUw8hjdZTKJZqBPPd3LL9QjVfjcqwH4kY0vA0LM8';

const getUnsplashData = async (img: string, num: number): Promise<UnsplashResult> => {
  const URL = `https://api.unsplash.com/search/photos?page=${1}&query=${img}&client_id=${ACCESS_KEY}&orientation=landscape&per_page=${num}`;
  return await (await fetch(URL)).json();
};

export default getUnsplashData;

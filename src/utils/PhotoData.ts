export interface UnsplashResult {
  results: PhotoData[];
  total: number;
  total_pages: number;
}

export interface PhotoData {
  alt_description: string;
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  user: {
    name: string;
  };
}

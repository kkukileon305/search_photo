import React from 'react';
import { PhotoData } from './PhotoData';

export interface CommonProps {
  children?: React.ReactNode;
}

export interface TitleProps extends CommonProps {}

export interface PhotoLiProps extends CommonProps {
  photoData: PhotoData;
}

export interface TopBtnProps extends CommonProps {
  page: number;
}

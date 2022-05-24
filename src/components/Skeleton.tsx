import styled, { keyframes } from 'styled-components';
import { flexStartCol } from '../styles/flex';

const sweepKeyframe = keyframes`
  0% {
    transform: translateX(0);
  }
  
  100% {
    transform: translateX(140%);
  }
`;

const StyledSkeleton = styled.div`
  width: calc((100% - 30px) / 2);
  height: 300px;
  ${flexStartCol}
  align-items: flex-start;
  gap: 20px;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: lightgray;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: -70%;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 70%);
    animation: ${sweepKeyframe} 0.5s infinite;
  }
`;

const SkeletonTitle = styled.h3`
  width: 80%;
  height: 30px;
  background-color: lightgray;
  margin: 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: -70%;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 70%);
    animation: ${sweepKeyframe} 0.5s infinite;
  }
`;

const SkeletonContent = styled.p`
  width: 50%;
  height: 20px;
  background-color: lightgray;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: -70%;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 70%);
    animation: ${sweepKeyframe} 0.5s infinite;
  }
`;

const Skeleton = () => {
  return (
    <StyledSkeleton>
      <SkeletonImage />
      <SkeletonTitle />
      <SkeletonContent />
    </StyledSkeleton>
  );
};

export default Skeleton;

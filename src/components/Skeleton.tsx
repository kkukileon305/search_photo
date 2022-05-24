import styled from 'styled-components';
import { flexStartCol } from '../styles/flex';

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
  background-color: gray;
`;

const SkeletonTitle = styled.h3`
  width: 80%;
  height: 20px;
  background-color: gray;
  margin: 0;
`;

const SkeletonContent = styled.p`
  width: 50%;
  height: 20px;
  background-color: gray;
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

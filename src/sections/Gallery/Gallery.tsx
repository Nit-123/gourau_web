import React from 'react';
import { SectionWrapper } from '../../components/common/SectionWrapper';
import { SectionTitle } from '../../components/ui/SectionTitle';

export const Gallery: React.FC = () => {
  return (
    <SectionWrapper id="gallery" className="bg-soft-white justify-center">
      <SectionTitle title="Gallery" subtitle="Screen 4" delay={0.1} />
    </SectionWrapper>
  );
};

export default Gallery;

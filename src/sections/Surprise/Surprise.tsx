import React from 'react';
import { SectionWrapper } from '../../components/common/SectionWrapper';
import { SectionTitle } from '../../components/ui/SectionTitle';

export const Surprise: React.FC = () => {
  return (
    <SectionWrapper id="surprise" className="bg-soft-white justify-center">
      <SectionTitle title="A Special Surprise" subtitle="Screen 7" delay={0.1} />
    </SectionWrapper>
  );
};

export default Surprise;

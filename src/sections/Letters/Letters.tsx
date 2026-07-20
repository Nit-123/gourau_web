import React from 'react';
import { SectionWrapper } from '../../components/common/SectionWrapper';
import { SectionTitle } from '../../components/ui/SectionTitle';

export const Letters: React.FC = () => {
  return (
    <SectionWrapper id="letters" className="bg-soft-white justify-center">
      <SectionTitle title="Love Letters" subtitle="Screen 5" delay={0.1} />
    </SectionWrapper>
  );
};

export default Letters;

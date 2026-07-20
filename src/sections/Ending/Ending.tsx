import React from 'react';
import { SectionWrapper } from '../../components/common/SectionWrapper';
import { SectionTitle } from '../../components/ui/SectionTitle';

export const Ending: React.FC = () => {
  return (
    <SectionWrapper id="ending" className="bg-soft-white justify-center">
      <SectionTitle title="Our Forever" subtitle="Screen 8" delay={0.1} />
    </SectionWrapper>
  );
};

export default Ending;

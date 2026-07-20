import React from 'react';
import { SectionWrapper } from '../../components/common/SectionWrapper';
import { SectionTitle } from '../../components/ui/SectionTitle';

export const Memories: React.FC = () => {
  return (
    <SectionWrapper id="memories" className="bg-soft-white justify-center">
      <SectionTitle title="Memories" subtitle="Screen 6" delay={0.1} />
    </SectionWrapper>
  );
};

export default Memories;

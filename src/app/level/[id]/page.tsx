'use client'

import { useParams } from 'next/navigation';
import LevelOne from '~/app/components/LevelOne';
import LevelTwo from '~/app/components/LevelTwo';
import LevelThree from '~/app/components/LevelThree';
import LevelFour from '~/app/components/LevelFour';
import PageTransition from '~/app/components/PageTransition';

const LevelPage = () => {
  const params = useParams();
  const levelId = params.id;

  const getLevelComponent = () => {
    switch (levelId) {
      case '1':
        return <LevelOne />;
      case '2':
        return <LevelTwo />;
      case '3':
        return <LevelThree />;
      case '4':
        return <LevelFour />;
      default:
        return <div>Level not found</div>;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b bg-black">
        {getLevelComponent()}
      </div>
    </PageTransition>
  );
};

export default LevelPage;
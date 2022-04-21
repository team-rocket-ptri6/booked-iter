import React, { useState } from 'react';
import ClubInfo from './ClubInfo';
import BookPanel from './BookPanel';

function ClubPage() {
  const [isMember, setIsMember] = useState(true);

  return (
    
    <div className="clubInfo">
      {!isMember ? 'We\'re sorry, but you are not a member of this club' :
        ( <span >
          <ClubInfo />
          {/* <ClubQuestions /> */}
          <BookPanel />
        </span>)
      } 
    </div>
  );
}

export default ClubPage;

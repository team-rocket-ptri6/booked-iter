import React, { useState } from 'react';

function NewClub (){
    
  return (  
    <form action="" style={{display: 'flex', flexDirection: 'column'}}>
      <input type="text" placeholder="Club Name" />
      <textarea rows="4" cols="50" placeholder="Tell us about your club!"></textarea>
      {/* <input type="text" placeholder="Add members" /> */}
      <button>submit</button> <button>cancel</button> 
    </form>
  );
}

export default NewClub;


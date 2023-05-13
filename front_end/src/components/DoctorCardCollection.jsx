import React , {Suspense  } from 'react'
import {Doctors} from './Doctors';
import {HashLoader} from 'react-spinners/HashLoader';
export const DoctorCardCollection = (doctors) => {
  return (<>
  <div style={{display:"flex",width:"100%",justifyContent:"space-between",flexWrap:"wrap",flexDirection:"row"}}>
  <Suspense fallback={<HashLoader color="#d65c36" />}>
       
          {doctors.map((row) => (<Doctors doctorDetailes={row}/>))}
            
        </Suspense>
</div>
  </>
    
  )
}


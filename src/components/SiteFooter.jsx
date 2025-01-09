import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function SiteFooter() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' Sathvik'}
        {/* <p className='text-dark'>
          Sathvik
        </p> */}
      </div>
    </MDBFooter>
  );
}
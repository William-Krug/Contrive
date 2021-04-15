import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EditVendorAbout from './EditVendorAbout';
import EditVendorBasicInfo from './EditVendorBasicInfo';
import EditVendorSpecialFeatures from './EditVendorSpecialFeatures';

function EditVendorProfile() {
  const dispatch = useDispatch();
  const params = useParams();
  const vendorDetails = useSelector((store) => store.vendor);

  useEffect(() => {
    dispatch({
      type: 'FETCH_SINGLE_VENDOR',
      payload: params.id,
    });
  }, []);

  return(
    <>
      <EditVendorBasicInfo />
      <EditVendorAbout />
      <EditVendorSpecialFeatures />      
    </>
  );
} // end EditVendorProfile

export default EditVendorProfile;
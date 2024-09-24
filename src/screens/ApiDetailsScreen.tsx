// src/screens/ApiDetailsScreen.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProviderDetails } from '../services/apiService';
import ApiDetails from '../components/ApiDetails';
import { useLocation } from 'react-router-dom';

function ApiDetailsScreen() {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appUrl = queryParams.get('appUrl') || "";
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getProviderDetails(appUrl).then(data => setDetails(data));
  }, [appUrl]);
  return <>{details && <ApiDetails details={details} />}</>;
}

export default ApiDetailsScreen;

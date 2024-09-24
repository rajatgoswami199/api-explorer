// src/screens/ProvidersScreen.tsx
import React, { useState, useEffect } from 'react';
import ExploreButton from '../components/ExplorerButton';
import Sidebar from '../components/Sidebar';
import { getProviders } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

function ProvidersScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [providers, setProviders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() =>{
     getProviders().then(data => setProviders(data.data));
  }, []);

  const handleProviderSelect = (provider: string) => {
    navigate(`/apis/?appUrl=${encodeURIComponent(provider)}`);

  };
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ExploreButton onClick={() => setIsOpen(!isOpen)} />
      <Sidebar isOpen={isOpen} providers={providers} onSelectProvider={handleProviderSelect} onClose={handleCloseSidebar}  />
    </div>
  );
}

export default ProvidersScreen;

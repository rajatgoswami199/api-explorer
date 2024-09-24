import axios from 'axios';

export const getProviders = async () => {
  const response = await axios.get('https://api.apis.guru/v2/providers.json');
  return response.data;
};

export const getSubItemList = async (providerName: string) => {
  const response = await axios.get(`https://api.apis.guru/v2/${providerName}.json`);
  return response.data;
};
export const getProviderDetails = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

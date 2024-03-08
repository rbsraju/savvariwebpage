import React, { useState, useEffect, FC } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ApiComponentProps {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: AxiosError<any>) => void; // Specify the AxiosError type
}

const ApiComponent: FC<ApiComponentProps> = ({ url, method, data, onSuccess, onError }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const config: AxiosRequestConfig = {
          method,
          url,
          data,
        };

        const response = await axios(config);

        if (onSuccess) {
          onSuccess(response);
        }
      } catch (error) {
        if (onError) {
          onError(error as AxiosError<any>); // Cast error to AxiosError
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, data, onSuccess, onError]);

  return <div>{loading ? 'Loading...' : 'Data loaded successfully!'}</div>;
};

export default ApiComponent;

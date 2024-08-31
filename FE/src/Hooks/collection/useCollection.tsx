

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Collection } from '@/types/collection';

const useCollection = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionDetail, setCollectionDetail] = useState<Collection | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const apiEndpoint = '/collections';

    const getAllCollections = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Collection[]>(apiEndpoint);
            setCollections(response.data);
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const getCollectionDetail = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get<Collection>(`${apiEndpoint}/${id}`);
            setCollectionDetail(response.data);
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const createCollection = async (collectionData: Partial<Collection>) => {
        setLoading(true);
        try {
            const response = await axios.post<Collection>(apiEndpoint, collectionData);
            setCollections(prev => [...prev, response.data]);
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const updateCollection = async (id: string, collectionData: Partial<Collection>) => {
        setLoading(true);
        try {
            const response = await axios.put<Collection>(`${apiEndpoint}/${id}`, collectionData);
            setCollections(prev => prev.map(collection => collection._id === id ? response.data : collection));
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const deleteCollection = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            setCollections(prev => prev.filter(collection => collection._id !== id));
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    return {
        collections,
        collectionDetail,
        loading,
        error,
        getAllCollections,
        getCollectionDetail,
        createCollection,
        updateCollection,
        deleteCollection
    };
};

export default useCollection;

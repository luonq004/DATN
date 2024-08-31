// src/hooks/useSlider.ts

import { Slider } from '@/types/slider';
import axios from 'axios';
import { useState } from 'react';

const useSlider = () => {
    const [slides, setSlides] = useState<Slider[]>([]);
    const [slideDetail, setSlideDetail] = useState<Slider | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const apiEndpoint = '/slider'; 

    const getAllSlides = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Slider[]>(apiEndpoint);
            setSlides(response.data);
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const getSlideDetail = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get<Slider>(`${apiEndpoint}/${id}`);
            setSlideDetail(response.data);
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const createSlide = async (slideData: Partial<Slider>) => {
        setLoading(true);
        try {
            const response = await axios.post<Slider>(apiEndpoint, slideData);
            setSlides(prev => [...(prev || []), response.data]);
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const updateSlide = async (id: string, slideData: Partial<Slider>) => {
        setLoading(true);
        try {
            const response = await axios.put<Slider>(`${apiEndpoint}/${id}`, slideData);
            setSlides(prev => prev.map(slide => slide._id === id ? response.data : slide));
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    const deleteSlide = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            setSlides(prev => prev.filter(slide => slide._id !== id));
        } catch (err: any) {
            setError(err.response?.data || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    return {
        slides,
        slideDetail,
        loading,
        error,
        getAllSlides,
        getSlideDetail,
        createSlide,
        updateSlide,
        deleteSlide
    };
};

export default useSlider;

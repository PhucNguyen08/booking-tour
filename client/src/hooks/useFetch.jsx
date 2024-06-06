import { getLocations } from '@/pages/admin/Location/LocationService';
import { getSites } from '@/pages/admin/Site/SiteService';
import {
    getTypeTours,
    getTours,
    getTourSchedules,
} from '@/pages/admin/Tour/TourService';
import { getNews } from '@/pages/admin/News/NewsService';
import { useQuery } from '@tanstack/react-query';

const useGetSites = () => {
    return useQuery({ queryKey: ['sites'], queryFn: getSites });
};

const useGetLocations = () => {
    return useQuery({ queryKey: ['locations'], queryFn: getLocations });
};

const useGetTypeTours = () => {
    return useQuery({ queryKey: ['typeTours'], queryFn: getTypeTours });
};

const useGetTours = () => {
    return useQuery({ queryKey: ['tours'], queryFn: getTours });
};

const useGetNews = () => {
    return useQuery({ queryKey: ['news'], queryFn: getNews });
};

const useGetTourSchedules = () => {
    return useQuery({
        queryKey: ['tourSchedules'],
        queryFn: getTourSchedules,
    });
};

export {
    useGetSites,
    useGetLocations,
    useGetTypeTours,
    useGetTourSchedules,
    useGetTours,
    useGetNews,
};

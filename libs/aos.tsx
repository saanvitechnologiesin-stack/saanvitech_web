"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AosInitializer = () => {
    useEffect(() => {
    AOS.init({
        duration: 1500,
        once: true,
    });
    }, []);

    return null;
};

export default AosInitializer;
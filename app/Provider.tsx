"use client"
import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

export function Provider({children,}: { children: React.ReactNode }) {
    return <ThemeProvider attribute={"class"} enableSystem={true} defaultTheme={"system"}>{children}</ThemeProvider>;
}

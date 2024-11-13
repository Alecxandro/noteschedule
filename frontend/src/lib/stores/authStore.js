// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue = {
    user: null,
    token: null,
    isAuthenticated: false
};

// Initialize from localStorage if available
const initialValue = browser 
    ? JSON.parse(localStorage.getItem('auth')) || defaultValue 
    : defaultValue;

export const auth = writable(initialValue);

// Subscribe to changes and update localStorage
if (browser) {
    auth.subscribe(value => {
        localStorage.setItem('auth', JSON.stringify(value));
    });
}
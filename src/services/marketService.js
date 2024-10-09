import conf from '../config/conf.js';

const refreshDatabase = async () => {
    try {
        const response = await fetch(`${conf.backendUrl}/markets/refresh-db`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to refresh database');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in refreshDatabase:', error);
        throw error;
    }
};

export const marketService = {
    refreshDatabase,
};

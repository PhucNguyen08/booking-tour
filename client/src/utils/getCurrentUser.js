const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        return JSON.parse(localStorage?.getItem('currentUser')) ?? null;
    }
};

export const getCurrentAdmin = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        return JSON.parse(localStorage?.getItem('adminUser')) ?? null;
    }
};

export default getCurrentUser;

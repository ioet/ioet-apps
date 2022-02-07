const service = {
    getValidToken: async (currentToken) => {
        const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        try {
            await timeout(1500);
            return currentToken;
        } catch (Ex) {
            console.log("------ token not valid, should call backend to refresh token");
            return null;
        }
    }
};

export default service;

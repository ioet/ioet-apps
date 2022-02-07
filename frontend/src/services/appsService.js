const service = {
    getApps: async (userId) => {
        const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await timeout(1500);
        return [
            {target: 'https://ioet.bamboohr.com', title: 'Bamboo', passToken: false},
            {target: 'https://app.jazz.co', title: 'JazzHR', passToken: false},
            {target: 'https://timetracker.ioet.com', title: 'Time Tracker', passToken: true},
            {target: 'https://ioet-reservation.infrastructurestuff.com', title: 'Desk reservation', passToken: true},
            {target: 'https://ioet.blogin.co', title: 'Blog', passToken: false},
        ];
    }
};

export default service;

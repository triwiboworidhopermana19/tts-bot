const { WebcastPushConnection } = require('tiktok-live-connector');

const initConnection = async (username) => {
    const connection = new WebcastPushConnection(username);

    try {
        const state = await connection.connect();

        console.info(`Connected to roomId ${state.roomId}`);
    } catch (error) {
        console.error('Failed to connect', err);        
    }


    return connection;
}

module.exports = initConnection;
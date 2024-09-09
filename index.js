const initConnection = require('./live-connection');
const { pushAndReadComment } = require('./comment-handler.js');
const PromptSync = require('prompt-sync');

const prompt = PromptSync();

async function main() {
    const username = prompt({ ask: 'Tiktok Username: ' });

    const connection = await initConnection(username);

    connection.on('chat', async (data) => {
        pushAndReadComment(data);
    });

}

(async () => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }
})();
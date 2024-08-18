import initConnection from './live-connection.js';
import { pushAndReadComment, initCommentHandler } from './comment-handler.js';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

async function main() {
    const username = prompt({ ask: 'Tiktok Username: ' });
    const sessionId = prompt({ ask: 'Tiktok Session Id: ' });

    initCommentHandler(sessionId);

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
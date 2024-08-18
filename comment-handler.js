import Queue from 'bull';
import tiktokTts from 'tiktok-tts';
import sound from "sound-play";
import path from 'path';
import fs from 'fs';

const commentQueue = new Queue('comment queue');

const { config, createAudioFromText } = tiktokTts;

commentQueue.process(async (job, done) => {
    const data = job.data;

    const audioPath = `./samples/${data.secUid}`;
    await createAudioFromText(`${data.uniqueId} mengatakan ${data.comment}`, `${audioPath}`, 'id_001');
    await sound.play(path.resolve(`${audioPath}.mp3`));

    fs.unlinkSync(path.resolve(`${audioPath}.mp3`));

    done();
});


const initCommentHandler = (sessionId) => {
    config(sessionId);
}

const pushAndReadComment = (data) => {
    commentQueue.add(data);
}

export { initCommentHandler, pushAndReadComment }

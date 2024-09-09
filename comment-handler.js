const Queue = require('bull');
const { play } = require('./audio-player.js');

const commentQueue = new Queue('comment queue');

commentQueue.process(async (job, done) => {
    const data = job.data;

    await play(data.secUid, data.uniqueId, data.comment, 'id_001');

    done();
});

const pushAndReadComment = (data) => {
    commentQueue.add(data);
}

module.exports.pushAndReadComment = pushAndReadComment;

const sound = require('sound-play');
const path = require('path');
const fs = require('fs');
const Axios = require('axios');

const play = async (audioName, username, say, locale = 'id') => {
    const audioPath = `./samples/${audioName}.mp3`;
    const comment = `${username} mengatakan ${say}`;

    await createAudioFromText(comment, audioPath, locale);
    await sound.play(path.resolve(audioPath));
    
    fs.unlinkSync(path.resolve(audioPath));
}

const createAudioFromText = async (comment, audioPath, locale) => {
    const baseUrl = 'https://translate.google.com/translate_tts';
    const queryParams = new URLSearchParams({
        ie: 'UTF-8',
        total: 1,
        idx: 0,
        client: 'tw-ob',
        q: comment,
        tl: locale
    });

    const response = await Axios({
        method: 'GET',
        url: `${baseUrl}?${queryParams}`,
        responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(audioPath));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve();
        });
        response.data.on('error', (err) => {
            reject(err);
        });
    })
}

module.exports.play = play
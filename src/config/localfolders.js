module.exports = {
    base: {
        path: './dist/assets/imgs/'
    },
    ffmpeg: {
        path: './bin/ffmpeg/bin/ffmpeg'
    },
    ffprobe: {
        path: './bin/ffmpeg/bin/ffprobe'
    },
    video: {
        dest: './dist/assets/rendered/',
        src: './dist/assets/imgs/'
    }
}

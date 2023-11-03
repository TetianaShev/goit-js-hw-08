import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const currentTimeKey = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(function(data) {
    localStorage.setItem(currentTimeKey, JSON.stringify(data.seconds))
  }, 1000));

  player.setCurrentTime(localStorage.getItem(currentTimeKey)).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});


// function timeUpdate(event) {
//     localStorage.setItem(currentTimeKey, event.seconds);
// }

// player.setCurrentTime(
//     localStorage.getItem(currentTimeKey) ? localStorage.getItem(currentTimeKey) : 0,
// );
// player.on('timeupdate', throttle(timeUpdate, 1000));
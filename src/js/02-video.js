import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(function (data) {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
}, 1000));

const lastCurrentTime = localStorage.getItem('videoplayer-current-time');
const playCurrentTime = JSON.parse(lastCurrentTime);

if (playCurrentTime) {
  player
  .setCurrentTime(playCurrentTime)
  .then(() => {
   })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
}



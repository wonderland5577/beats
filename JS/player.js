let player;
const playerContainer = $(".player__wrapper");

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();

    if (playerContainer.hasClass("paused")) {
      playerContainer.removeClass("paused");
      player.pauseVideo();
    }
    else {
      playerContainer.addClass("paused");
      player.playVideo();
    }
  })

  $(".player__playback").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`
    });
    player.seekTo(newPlaybackPositionSec);

    $(".player__splash").click(e => {
          player.playVideo();
        });
  });
}

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  };

		
    $('.player__playback-button').css({
      left: `${durationSec}%`
		});
		$('.player__playback-current').css({
			width: `${durationSec}%`
		});

  // ================

  const currentVolume = player.getVolume();
		
		$('.player__volume-button').css({
			left: `${currentVolume}%`
		});
		$('.player__volume-current').css({
			width: `${currentVolume}%`
		});


 

    // ======================

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

    $('.player__playback-current').css({
      width: `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);


  $(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;

    $(".player__playback-button").css({
      left: `${buttonPosPercent}%`
    });

    player.seekTo(newPlayerTimeSec);
  });

  $(".player__splash").on("click", e => {
    player.playVideo();
  });
};

// ================ VOLUME

$(".player__volume-img").on('click', () => {
  let isMuted = player.isMuted()
  if (!isMuted) {
    player.mute();

    $(".player__volume-button").css({
      left: '0'
    });

  } else {
    player.unMute();
    const volumeAfterMute = player.getVolume();
    $(".player__volume-button").css({
      left: `${volumeAfterMute}%`
    });
    $(".player__volume-current").css({
      width: `${volumeAfterMute}%`
    });
  }
});

$('.player__volume-bar').click(e => {
  const track = $(e.currentTarget);
  const clickedPos = e.originalEvent.layerX;
  const newBtnPosPercent = (clickedPos / track.width() * 100);
  const newVolumePosSec = newBtnPosPercent;

    $(".player__volume-button").css({
      left: `${newBtnPosPercent}%`
    });
    $(".player__volume-current").css({
      width: `${newBtnPosPercent}%`
    });
  
  player.setVolume(newVolumePosSec);

  console.log(newVolumePosSec);
})

// ======================================


const onPlayerStateChange = event => {
  switch(event.data) {
    case 1: 
      $('.player__wrapper').addClass('active');
      $(".player__start").addClass("paused");
      break;
    case 2: 
    $(".player__start").removeClass("paused");
      break;
  }
};




function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "406",
    width: "660",
    videoId: "MoW7AEvQoVQ",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();

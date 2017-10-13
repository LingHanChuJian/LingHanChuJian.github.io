(function(){
  var $mp3Num = 1;
  var playlist = [];

  // 获取随机数
  function rand(playlistlen,num)
  {
  	var $rands = parseInt(Math.random()*playlistlen);
  	if ($rands==num) {
  		rand(playlistlen,num);
  	}else
  	{
  		return $rands;
  	}
  }
  // 点击事件
  function class_click(playlist){
  	var $ismusic = true;
  	var $num = 1;
    var playlistlen = playlist.length;
  	// alert(playlistlen);
  	var music_audio = $('<audio id="audio" autoplay="autoplay" src='+playlist[$num]+' volume="">--!版本太低.</audio>');
  	$("#music").append(music_audio);
  	var audioEle = $("#audio")[0];
  	audioEle.volume = 0.2;//设置音量
  	$(".music_play_stop").addClass('style_music');
  	$(".music_play_stop").click(function(){
  		if ($ismusic) {
  			//暂停代码
  			$(".music_play_stop").removeClass('style_music');
  			audioEle.pause();
  			$ismusic = false;
  		}else
  		{
  			//播放代码
  			$(".music_play_stop").addClass('style_music');
  			audioEle.play();
  			$ismusic = true;
  		}
  	});

  	// 上一曲
  	$(".music_left").click(function(){
  		if ($num==0) {
  			$num = playlistlen;
  		}else
  		{
  			$num--;
  		}
  		$("#audio").attr('src',playlist[$num]);
  		$(".music_play_stop").addClass('style_music');
  		audioEle.play();
  	});
  	// 下一曲
  	$(".music_right").click(function(){
  		if ($num==playlistlen) {
  			$num = 0;
  		}else
  		{
  			$num++;
  		}
  		$("#audio").attr('src',playlist[$num]);
  		$(".music_play_stop").addClass('style_music');
  		audioEle.play();
  	});

  	//随机播放下一曲
  	setInterval(function(){
  		if (audioEle.ended) {
  			$num = rand(playlistlen,$num);
  			$("#audio").attr('src',playlist[$num]);
  		};
  	},3000);
  }
  function get_MP3()
  {
  	var mp3Url = "https://ox8e1wv8q.bkt.clouddn.com/music"+$mp3Num+".mp3";
  	 $.ajax({
		  url: mp3Url,
		  type: 'GET',
		  complete: function(response) {
		   if(response.status == 200) {
  			playlist.push(mp3Url);
  			$mp3Num++;
  			get_MP3();
		   } else {
		    class_click(playlist);
		   }
		  }
		 });
  }
  get_MP3();
})(jQuery)
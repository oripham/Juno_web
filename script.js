$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
    });
  
    $(".owl-prev").on("click", function () {
        console.log("Prev button clicked");
        $(".owl-carousel").trigger("prev.owl.carousel");
      });
      
      $(".owl-next").on("click", function () {
        console.log("Next button clicked");
        $(".owl-carousel").trigger("next.owl.carousel");
      });
      
  });
  


// Các ID của video và thông tin về video
const videoIDs = ["sD5dcuu70JA", "M5sXSeqD9xU"];
const videoContainers = ["video1", "video2"];

// Hàm tạo trình trình phát YouTube cho video cụ thể
function createYouTubePlayer(videoID, containerID) {
  return new YT.Player(containerID, {
    width: '100%',
    videoId: videoID,
    playerVars: {
      'autoplay': 1, // bật tự động phát
			'mute': 1,
      'controls': 0, // k hiển thị nút điều khiển
      'showinfo': 0, // Tắt thông tin video
      'loop': 1, // Lặp video
			'showinfo': 0,
      'playlist': videoID // Sử dụng video hiện tại làm danh sách phát ảo
    },
  });
}

// Hàm gọi khi Thư viện YouTube IFrame API đã được tải
function onYouTubeIframeAPIReady() {
  for (let i = 0; i < videoIDs.length; i++) {
    createYouTubePlayer(videoIDs[i], videoContainers[i]);
  }
}


function toggleLists() {
    // Lấy tất cả các danh sách targetList
    var targetLists = document.querySelectorAll('.targetList');

    // Lặp qua mỗi danh sách và thay đổi thuộc tính display dựa trên trạng thái hiện tại
    targetLists.forEach(function(targetList) {
        if (targetList.style.display === 'none' || targetList.style.display === '') {
            targetList.style.display = 'block';
        } else {
            targetList.style.display = 'none';
        }
    });
}
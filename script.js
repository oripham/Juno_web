$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2,
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
function showFilter() {
    // Lấy tất cả các danh sách targetList
    var showFilters = document.querySelector('.show-filter');

    if (showFilters.style.display === 'none' || showFilters.style.display === '') {
        showFilters.style.display = 'block';
    } else {
        showFilters.style.display = 'none';
    }
    
}

var productList = [
    {
        image: ["images/product1a.png", "images/product1b.png"],
        name: "Túi Xách Nhỏ Đeo Vai Lock & Key",
        price: 843
    },
    {
        image: ["images/product2a.png", "images/product2b.png"],
        name: "Túi Xách Trung Lock & Key",
        price: 882
    },
    {
        image: ["images/product3a.png", "images/product3b.png"],
        name: "Túi Xách Nhỏ Top Handle Lock & Key",
        price: 843
    },
    {
        image: ["images/product4a.png", "images/product4b.png"],
        name: "Đầm Thun Midi Xoắn Lưng",
        price: 637
    },
    {
        image: ["images/pro-rec1a.png", "images/pro-rec1b.png"],
        name: "Giày Cao Gót Quai Ngang Trang Trí Khoá",
        price: 449
    },
    {
        image: ["images/pro-rec2a.png", "images/pro-rec2b.png"],
        name: "Giày Cao Gót Quai Ngang Trang Trí Khoá",
        price: 450
    },
    {
        image: ["images/pro-rec3a.png", "images/pro-rec3b.png"],
        name: "Giày Búp Bê Mary Jean Phối Khoá Tennis",
        price: 450
    },
    {
        image: ["images/pro-rec4a.png", "images/pro-rec4b.png"],
        name: "Giày Búp Bê Cao Gót Trang Trí Khoá",
        price: 446
    },
    {
        image: ["images/pro-rec5a.png", "images/pro-rec5b.png"],
        name: "Ví Trang Trí Khoá Pyramid",
        price: 446
    },
    {
        image: ["images/pro-rec6a.png", "images/pro-rec6b.png"],
        name: "Ví Có Dây Đeo Trang Trí Khoá",
        price: 588
    },
    {
        image: ["images/pro-rec7a.png", "images/pro-rec7b.png"],
        name: "Túi Xách Nhỏ Dạng Hộp Moon Box",
        price: 588
    },
    {
        image: ["images/pro-rec8a.png", "images/pro-rec8b.png"],
        name: "Ví Có Dây Đeo Trang Trí Khoá",
        price: 784
    },
    {
        image: ["images/product5a.png", "images/product5b.png"],
        name: "Quần Tây Dáng Đứng Ủi Li",
        price: 620
    },
    {
        image: ["images/product6a.png","images/product6b.png"],
        name: "Mắt Kính Butterfly Trendy Kim Loại ",
        price: 550
    }
]





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
        price: [843,652]
    },
    {
        image: ["images/product2a.png", "images/product2b.png"],
        name: "Túi Xách Trung Lock & Key",
        price: [882,785]
    },
    {
        image: ["images/product3a.png", "images/product3b.png"],
        name: "Túi Xách Nhỏ Top Handle Lock & Key",
        price: [843,725]
    },
    {
        image: ["images/product4a.png", "images/product4b.png"],
        name: "Đầm Thun Midi Xoắn Lưng",
        price: [637,545]
    },
    {
        image: ["images/pro-rec1a.png", "images/pro-rec1b.png"],
        name: "Giày Cao Gót Quai Ngang Trang Trí Khoá",
        price: [449,354]
    },
    {
        image: ["images/pro-rec2a.png", "images/pro-rec2b.png"],
        name: "Giày Cao Gót Quai Ngang Trang Trí Khoá",
        price: [450,350]
    },
    {
        image: ["images/pro-rec3a.png", "images/pro-rec3b.png"],
        name: "Giày Búp Bê Mary Jean Phối Khoá Tennis",
        price: [450,369]
    },
    {
        image: ["images/pro-rec4a.png", "images/pro-rec4b.png"],
        name: "Giày Búp Bê Cao Gót Trang Trí Khoá",
        price: [446,330]
    },
    {
        image: ["images/pro-rec5a.png", "images/pro-rec5b.png"],
        name: "Ví Trang Trí Khoá Pyramid",
        price: [446,345]
    },
    {
        image: ["images/pro-rec6a.png", "images/pro-rec6b.png"],
        name: "Ví Có Dây Đeo Trang Trí Khoá",
        price: [588,499]
    },
    {
        image: ["images/pro-rec7a.png", "images/pro-rec7b.png"],
        name: "Túi Xách Nhỏ Dạng Hộp Moon Box",
        price: [588,354]
    },
    {
        image: ["images/pro-rec8a.png", "images/pro-rec8b.png"],
        name: "Ví Có Dây Đeo Trang Trí Khoá",
        price: [784,530]
    },
    {
        image: ["images/product5a.png", "images/product5b.png"],
        name: "Quần Tây Dáng Đứng Ủi Li",
        price: [620,545]
    },
    {
        image: ["images/product6a.png","images/product6b.png"],
        name: "Mắt Kính Butterfly Trendy Kim Loại ",
        price: [550,460]
    }
]

function renderProducts(products) {
    var targetElement = document.getElementById("grid-container-collection");
    targetElement.innerHTML = '';

    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var productDiv = document.createElement("div");
        productDiv.className = "pro-loop customize";
        productDiv.style.margin = "10px 0 20px 0";
        productDiv.style.zIndex = "0";

        productDiv.innerHTML = `
            <div style="position: relative;" class="product-block">
                <div class="product-img">
                    <a href="#" style="display: block;">
                        <picture>
                            <img src="${product.image[0]}" alt="${product.name}">
                        </picture>
                        <picture>
                            <img src="${product.image[1]}" alt="${product.name}">
                        </picture>
                    </a>
                </div>
                <div class="product-detail clear-fix" style="padding: 0;">
                    <div>
                        <h3>
                            <a href="#">${product.name}</a>
                        </h3>
                    </div>
                    <div style="text-align: center;">
                        <p style="font-weight: bold; color: black;">${product.price[0]},000đ</p>
                    </div>
                </div>
                <div class="activeLabelStatus actionLoop" >
                    <div class="labelNew">HÀNG MỚI</div>
                </div>
                <div style="display: block !important;" class="actionLoop">
                    <a href="#">MUA NGAY</a>
                </div>
            </div>
        `;

        targetElement.appendChild(productDiv);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Lắng nghe sự kiện click trên label
    document.querySelectorAll('.custom-color').forEach(function (label) {
        label.addEventListener('click', function () {
            // Bỏ lớp 'selected' từ tất cả các label khác
            document.querySelectorAll('.custom-color').forEach(function (otherLabel) {
                otherLabel.classList.remove('selected');
            });

            // Thêm lớp 'selected' cho label được click
            this.classList.add('selected');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Lắng nghe sự kiện click trên label
    document.querySelectorAll('.custom-size').forEach(function (label) {
        label.addEventListener('click', function () {
            // Bỏ lớp 'selected' từ tất cả các label khác
            document.querySelectorAll('.custom-size').forEach(function (otherLabel) {
                otherLabel.classList.remove('selected');
            });

            // Thêm lớp 'selected' cho label được click
            this.classList.add('selected');
        });
    });
});

function changeColor1(){
    var imagesDisplayed = document.getElementById('images');
    imagesDisplayed.innerHTML = '';
    imagesDisplayed.innerHTML =`
    <div style="width: 91.66666667%; position: relative; padding: 0; float: left;">
        <div id="slide-image">
            <div style="width: 50%; float: left">
                <a href="images/product4a.png">
                    <img src="images/product4a.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 50%; float: left">
                <a href="images/product4b.png">
                    <img src="images/product4b.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 25%; float: left">
                <a href="images/product4c.png">
                    <img src="images/product4c.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 25%; float: left">
                <a href="images/product4d.png">
                    <img src="images/product4d.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 25%; float: left">
                <a href="images/product4e.png">
                    <img src="images/product4e.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 25%; float: left">
                <a href="images/product4f.png">
                    <img src="images/product4f.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
        </div>
    </div>`;
}
function changeColor2(){
    var imagesDisplayed = document.getElementById('images');
    imagesDisplayed.innerHTML = '';
    imagesDisplayed.innerHTML =`
    <div style="width: 91.66666667%; position: relative; padding: 0; float: left;">
        <div id="slide-image">
            <div style="width: 50%; float: left">
                <a href="images/product4a1.png">
                    <img src="images/product4a1.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 50%; float: left">
                <a href="images/product4b1.png">
                    <img src="images/product4b1.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 25%; float: left">
                <a href="images/product4c1.png">
                    <img src="images/product4c1.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 25%; float: left">
                <a href="images/product4d1.png">
                    <img src="images/product4d1.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 25%; float: left">
                <a href="images/product4e1.png">
                    <img src="images/product4e1.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
            <div style="width: 25%; float: left">
                <a href="images/product4f1.png">
                    <img src="images/product4f1.png" alt="Đầm thu midi xoắn lưng" class="img-responsive">
                </a>
            </div>
        </div>
    </div>`;
}

function changeDetails1(){
    var details = document.getElementById('tab-content');
    details.innerHTML = '';
    details.innerHTML = `
    <div style="display: block; visibility: visible;">
        <div class="description-productdetail" style="margin: 15px 0 0 0;">
            <p>- Đầm thun midi xoắn lưng thời trang, nữ tính</p>
            <p>- Trang phục phù hợp dạo phố, thường ngày,...</p>
            <p>- Kch thước áo: S - M - L</p>
            <p>S : 118cm - M : 120cm - L : 122cm</p>
            <p><strong>Hướng dẫn sửdụng</strong><br>
            - Giặt tay bằng nước lạnh</p>
            <p>- Không ngâm, không tẩy</p>
            <p>- Giặt riêng các sản phẩm khác màu</p>
            <p>- Không vắt</p>
            <p>- L&à ủi ở nhiệt độ thấp.</p>
            <p>- Khuyến kch giặt khô</p>
        </div>
    </div>`
}
function changeDetails2(){
    var details = document.getElementById('tab-content');
    details.innerHTML = '';
    details.innerHTML = `
        <div style="display: block; visibility: visible; margin: 20px 0 0 0;">
            <div style="margin: 15px 0 0 0">
                <div style="float: left; width: 50%; padding: 0;">
                    <ul style="list-style: inherit; margin-left: 15px; margin-bottom: 100px">
                        <li>
                            <span class="infobe">Mã sản phẩm:</span>
                            <span class="infoaf">JNDLU064</span>
                        </li>
                        <li>
                            <span class="infobe">Kiểu dáng:</span>
                            <span class="infoaf">Đầm lửng</span>
                        </li>
                        <li>
                            <span class="infobe">Chất liệu:</span>
                            <span class="infoaf">Knit</span>
                        </li>
                        <li>
                            <span class="infobe">Màu sắc:</span>
                            <span class="infoaf">Đen-Nâu</span>
                        </li>
                        <li>
                            <span class="infobe">Kích cỡ:</span>
                            <span class="infoaf">S-M-L</span>
                        </li>
                        <li>
                            <span class="infoaf">Giá đã bao gồm VAT</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`
}
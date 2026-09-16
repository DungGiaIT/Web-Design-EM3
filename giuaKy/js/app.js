import { API_URL, Phim } from "./phim.js";

let currentDanhSachPhim = [];
let currentlySelectedMovieId = null;

async function getDanhSachPhim() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Không thể lấy danh sách phim");
    }

    const data = await response.json();

    return data.map(phim => {
        return new Phim(
            phim.id,
            phim.tenPhim,
            phim.moTa,
            phim.thoiLuong,
            phim.namPhatHanh,
            phim.gia,
            phim.anh
        );
    });
}

function renderPhim(danhSachPhim) {
    const movieList = document.getElementById("movieList");
    if (!movieList) return;

    movieList.innerHTML = "";

    danhSachPhim.forEach(phim => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const giaFormatted = phim.gia
            ? Number(phim.gia).toLocaleString("vi-VN") + " VNĐ"
            : "Miễn phí";

        const imgUrl = phim.anh || "";

        card.innerHTML = `
            <img
                src="${imgUrl}"
                alt="${phim.tenPhim}"
            >

            <div class="movie-content">
                <h3>${phim.tenPhim}</h3>

                <div class="movie-info">
                    ${phim.thoiLuong} phút | ${phim.namPhatHanh}
                </div>

                <p>${phim.moTa}</p>

                <button onclick="xemPhim('${phim.id}')">
                    Xem Ngay
                </button>
            </div>
        `;

        movieList.appendChild(card);
    });
}

window.xemPhim = function(id) {
    const phim = currentDanhSachPhim.find(p => String(p.id) === String(id));

    if (!phim) {
        alert(`Không tìm thấy thông tin phim với ID: ${id}`);
        return;
    }

    currentlySelectedMovieId = id;

    const detailTenPhim = document.getElementById("detailTenPhim");
    const detailMovieBody = document.getElementById("detailMovieBody");
    const detailMovieModal = document.getElementById("detailMovieModal");

    if (detailMovieModal && detailMovieBody && detailTenPhim) {
        detailTenPhim.innerText = phim.tenPhim;

        const giaFormatted = phim.gia
            ? Number(phim.gia).toLocaleString("vi-VN") + " VNĐ"
            : "Miễn phí";

        const imgUrl = phim.anh || "";

        detailMovieBody.innerHTML = `
            <div class="detail-card">
                <img src="${imgUrl}" alt="${phim.tenPhim}">
                <div class="detail-meta">
                    <div>Mã Phim: <span>${phim.id}</span></div>
                    <div>Thời lượng: <span>${phim.thoiLuong} phút</span></div>
                    <div>Năm phát hành: <span>${phim.namPhatHanh}</span></div>
                </div>
                <div class="detail-price">Giá vé: ${giaFormatted}</div>
                <div class="detail-desc">
                    <strong>Nội dung phim:</strong><br>
                    ${phim.moTa}
                </div>
            </div>
        `;

        detailMovieModal.classList.add("show");
    } else {
        alert(
            `Thông Tin Phim:\n` +
            `- ID: ${phim.id}\n` +
            `- Tên phim: ${phim.tenPhim}\n` +
            `- Mô tả: ${phim.moTa}\n` +
            `- Thời lượng: ${phim.thoiLuong} phút\n` +
            `- Năm phát hành: ${phim.namPhatHanh}\n` +
            `- Giá: ${Number(phim.gia).toLocaleString("vi-VN")} VNĐ`
        );
    }
};

// Modal helpers
function setupModalEvents() {
    const addMovieModal = document.getElementById("addMovieModal");
    const btnOpenAddModal = document.getElementById("btn-open-add-modal");
    const closeAddModal = document.getElementById("closeAddModal");
    const btnCancelAdd = document.getElementById("btnCancelAdd");
    const addMovieForm = document.getElementById("addMovieForm");

    const modalFormTitle = document.getElementById("modalFormTitle");
    const btnSubmitForm = document.getElementById("btnSubmitForm");
    const editMovieIdInput = document.getElementById("editMovieId");

    const detailMovieModal = document.getElementById("detailMovieModal");
    const closeDetailModal = document.getElementById("closeDetailModal");
    const btnEditMovie = document.getElementById("btnEditMovie");
    const btnDeleteMovie = document.getElementById("btnDeleteMovie");

    const openAddModal = () => {
        if (addMovieForm) addMovieForm.reset();
        if (editMovieIdInput) editMovieIdInput.value = "";
        if (modalFormTitle) modalFormTitle.innerText = "Thêm Phim Mới";
        if (btnSubmitForm) btnSubmitForm.innerText = "Lưu Sản Phẩm";
        if (addMovieModal) addMovieModal.classList.add("show");
    };

    const closeAddModalFunc = () => {
        if (addMovieModal) addMovieModal.classList.remove("show");
    };

    const closeDetailModalFunc = () => {
        if (detailMovieModal) detailMovieModal.classList.remove("show");
    };

    if (btnOpenAddModal) btnOpenAddModal.addEventListener("click", openAddModal);
    if (closeAddModal) closeAddModal.addEventListener("click", closeAddModalFunc);
    if (btnCancelAdd) btnCancelAdd.addEventListener("click", closeAddModalFunc);

    if (closeDetailModal) closeDetailModal.addEventListener("click", closeDetailModalFunc);

    // Click "Sửa" in Detail Modal
    if (btnEditMovie) {
        btnEditMovie.addEventListener("click", () => {
            const phim = currentDanhSachPhim.find(p => String(p.id) === String(currentlySelectedMovieId));
            if (!phim) return;

            closeDetailModalFunc();

            if (editMovieIdInput) editMovieIdInput.value = phim.id;
            if (document.getElementById("tenPhim")) document.getElementById("tenPhim").value = phim.tenPhim || "";
            if (document.getElementById("moTa")) document.getElementById("moTa").value = phim.moTa || "";
            if (document.getElementById("thoiLuong")) document.getElementById("thoiLuong").value = phim.thoiLuong || "";
            if (document.getElementById("namPhatHanh")) document.getElementById("namPhatHanh").value = phim.namPhatHanh || "";
            if (document.getElementById("gia")) document.getElementById("gia").value = phim.gia || "";
            if (document.getElementById("anh")) document.getElementById("anh").value = phim.anh || "";

            if (modalFormTitle) modalFormTitle.innerText = "Chỉnh Sửa Phim";
            if (btnSubmitForm) btnSubmitForm.innerText = "Cập Nhật Phim";

            if (addMovieModal) addMovieModal.classList.add("show");
        });
    }

    // Click "Xóa" in Detail Modal
    if (btnDeleteMovie) {
        btnDeleteMovie.addEventListener("click", async () => {
            const phim = currentDanhSachPhim.find(p => String(p.id) === String(currentlySelectedMovieId));
            if (!phim) return;

            const isConfirmed = confirm(`Bạn có chắc chắn muốn xóa phim "${phim.tenPhim}" không?`);
            if (!isConfirmed) return;

            btnDeleteMovie.disabled = true;
            btnDeleteMovie.innerText = "Đang xóa...";

            try {
                const isDeleted = await phim.xoaPhim();
                if (isDeleted) {
                    currentDanhSachPhim = currentDanhSachPhim.filter(p => String(p.id) !== String(phim.id));
                    renderPhim(currentDanhSachPhim);
                    alert("Đã xóa phim thành công!");
                    closeDetailModalFunc();
                } else {
                    alert("Xóa phim thất bại!");
                }
            } catch (error) {
                console.error("Lỗi khi xóa phim:", error);
                alert("Không thể xóa phim. Vui lòng kiểm tra lại kết nối!");
            } finally {
                btnDeleteMovie.disabled = false;
                btnDeleteMovie.innerText = "Xóa";
            }
        });
    }

    // Close modal on clicking backdrop
    window.addEventListener("click", (event) => {
        if (event.target === addMovieModal) closeAddModalFunc();
        if (event.target === detailMovieModal) closeDetailModalFunc();
    });

    // Handle Submit Form (Thêm hoặc Sửa Phim)
    if (addMovieForm) {
        addMovieForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const editId = editMovieIdInput ? editMovieIdInput.value.trim() : "";
            const tenPhim = document.getElementById("tenPhim").value.trim();
            const moTa = document.getElementById("moTa").value.trim();
            const thoiLuong = Number(document.getElementById("thoiLuong").value);
            const namPhatHanh = Number(document.getElementById("namPhatHanh").value);
            const gia = Number(document.getElementById("gia").value);
            const anh = document.getElementById("anh") ? document.getElementById("anh").value.trim() : "";

            const submitBtn = btnSubmitForm || addMovieForm.querySelector("button[type='submit']");
            const originalText = submitBtn ? submitBtn.innerText : "Lưu";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = "Đang lưu...";
            }

            try {
                if (editId) {
                    // Cập nhật phim đã có
                    const phimCapNhat = new Phim(editId, tenPhim, moTa, thoiLuong, namPhatHanh, gia, anh);
                    const result = await phimCapNhat.capNhatPhim();

                    const index = currentDanhSachPhim.findIndex(p => String(p.id) === String(editId));
                    if (index !== -1) {
                        currentDanhSachPhim[index] = new Phim(
                            editId,
                            result.tenPhim || tenPhim,
                            result.moTa || moTa,
                            result.thoiLuong || thoiLuong,
                            result.namPhatHanh || namPhatHanh,
                            result.gia || gia,
                            result.anh || anh
                        );
                    }

                    renderPhim(currentDanhSachPhim);
                    alert("Cập nhật phim thành công!");
                } else {
                    // Thêm phim mới
                    const phimMoi = new Phim(null, tenPhim, moTa, thoiLuong, namPhatHanh, gia, anh);
                    const result = await phimMoi.themPhim();

                    const phimDaTao = new Phim(
                        result.id,
                        result.tenPhim || tenPhim,
                        result.moTa || moTa,
                        result.thoiLuong || thoiLuong,
                        result.namPhatHanh || namPhatHanh,
                        result.gia || gia,
                        result.anh || anh
                    );

                    currentDanhSachPhim.unshift(phimDaTao);
                    renderPhim(currentDanhSachPhim);
                    alert("Thêm sản phẩm phim mới thành công!");
                }

                closeAddModalFunc();
                addMovieForm.reset();
            } catch (error) {
                console.error("Lỗi khi xử lý phim:", error);
                alert("Thao tác thất bại. Vui lòng thử lại!");
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                }
            }
        });
    }
}

function setupSearchEvent() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        if (!keyword) {
            renderPhim(currentDanhSachPhim);
            return;
        }

        const filteredList = currentDanhSachPhim.filter(phim => {
            const matchTen = phim.tenPhim && phim.tenPhim.toLowerCase().includes(keyword);
            const matchMoTa = phim.moTa && phim.moTa.toLowerCase().includes(keyword);
            return matchTen || matchMoTa;
        });

        renderPhim(filteredList);
    });
}

async function init() {
    setupModalEvents();
    setupSearchEvent();

    try {
        currentDanhSachPhim = await getDanhSachPhim();
        renderPhim(currentDanhSachPhim);
    } catch (error) {
        console.error("Lỗi khi tải danh sách phim:", error);
        const movieList = document.getElementById("movieList");
        if (movieList) {
            movieList.innerHTML = "<p>Không thể tải danh sách phim. Vui lòng thử lại sau.</p>";
        }
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
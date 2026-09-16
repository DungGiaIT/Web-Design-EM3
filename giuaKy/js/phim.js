export const API_URL = "https://6aaa428fff4dd5698b4e3e59.mockapi.io/Phim";

export class Phim {
    constructor(
        id,
        tenPhim,
        moTa,
        thoiLuong,
        namPhatHanh,
        gia,
        anh
    ) {
        this.id = id;
        this.tenPhim = tenPhim;
        this.moTa = moTa;
        this.thoiLuong = thoiLuong;
        this.namPhatHanh = namPhatHanh;
        this.gia = gia;
        this.anh = anh;
    }

    async themPhim() {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tenPhim: this.tenPhim,
                moTa: this.moTa,
                thoiLuong: Number(this.thoiLuong),
                namPhatHanh: Number(this.namPhatHanh),
                gia: Number(this.gia),
                anh: this.anh
            })
        });

        return await response.json();
    }

    async capNhatPhim() {
        const response = await fetch(`${API_URL}/${this.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tenPhim: this.tenPhim,
                moTa: this.moTa,
                thoiLuong: Number(this.thoiLuong),
                namPhatHanh: Number(this.namPhatHanh),
                gia: Number(this.gia),
                anh: this.anh
            })
        });

        return await response.json();
    }

    async xoaPhim() {
        const response = await fetch(`${API_URL}/${this.id}`, {
            method: "DELETE"
        });

        return response.ok;
    }
}
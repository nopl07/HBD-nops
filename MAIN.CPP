#include <iostream>
using namespace std;

int main() {
    int pilihan;
    float sisi, panjang, lebar, r;
    float luas, keliling;
    float pi = 3.14;

    cout << "Pilih Bangun Datar" << endl;
    cout << "1. Persegi" << endl;
    cout << "2. Persegi Panjang" << endl;
    cout << "3. Lingkaran" << endl;
    cout << "Masukkan pilihan: ";
    cin >> pilihan;

    if (pilihan == 1) {
        cout << "Masukkan sisi: ";
        cin >> sisi;

        luas = sisi * sisi;
        keliling = 4 * sisi;

        cout << "Luas = " << luas << endl;
        cout << "Keliling = " << keliling << endl;
    }
    else if (pilihan == 2) {
        cout << "Masukkan panjang: ";
        cin >> panjang;

        cout << "Masukkan lebar: ";
        cin >> lebar;

        luas = panjang * lebar;
        keliling = 2 * (panjang + lebar);

        cout << "Luas = " << luas << endl;
        cout << "Keliling = " << keliling << endl;
    }
    else if (pilihan == 3) {
        cout << "Masukkan jari-jari: ";
        cin >> r;

        luas = pi * r * r;
        keliling = 2 * pi * r;

        cout << "Luas = " << luas << endl;
        cout << "Keliling = " << keliling << endl;
    }
    else {
        cout << "Pilihan tidak tersedia" << endl;
    }

    return 0;
}
🎁

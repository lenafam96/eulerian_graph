#include<iostream>
#include<conio.h>
using namespace std;
#define MAX 50
#define TRUE 1
#define FALSE 0
int A[MAX][MAX], n, u;
void Init() {
    freopen("input.txt", "r", stdin);
    cin >> n;
    cout << "So dinh do thi:" << n << endl;
    //nhập ma trận kề.
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> A[i][j];
        }
    }
}
int Kiemtra() {
    int s, d;
    d = 0; //biến đếm số đỉnh bật lẻ.
    for (int i = 1; i <= n; i++) {
        s = 0;
        for (int j = 1; j <= n; j++)
            s += A[i][j];
        if (s % 2) {
            d++; //tăng giá trị biến đếm đỉnh bậc lẻ.
            u = i; //Ghi nhớ đỉnh bặc lẻ.
        }
    }
    return d==2;
}
void DDEULER() {
    int v, x, top, dCE;
    int stack[MAX], CE[MAX];
    top = 1;
    stack[top] = u; // nạp đỉnh bậc lẻ vào trong stack.
    dCE = 0;
    do {
        v = stack[top]; // lấy đỉnh v ra khỏi stack.
        //tìm đỉnh x kề với v.
        x = 1;
        while (x <= n && A[v][x] == 0)
            x++;
        //nếu đỉnh x không kề với v -> lấy v ra khỏi stack và đưa vào CE.
        if (x > n) {
            dCE++;
            CE[dCE] = v;
            top--;
        }
        //nếu đỉnh x kề với đỉnh v -> đưa x vào stack và xóa cạnh (v,x).
        else {
            top++;
            stack[top] = x;
            A[v][x] = 0;
            A[x][v] = 0;
        }
    } while (top != 0);
    cout << "Co duong di Euler:";
    //In kết quả chứa trong CE theo thứ tự ngược lại.
    for (x = dCE; x > 1; x--)
        cout << (char)(CE[x] + 'a' - 1) << "->"; //in ra kết quả dưới dạng char.
    cout << (char)(CE[x] + 'a' - 1)<<endl;
}
int main(void) {
    Init();
    if (Kiemtra())
        DDEULER();
    else printf("Khong co duong di Euler");
    return 0;
}
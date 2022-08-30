#include<iostream>
#include<conio.h>
using namespace std;
#define MAX 50
#define TRUE 1
#define FALSE 0
int A[MAX][MAX], n, u = 1;
void Init(void) {    
    freopen("input.txt", "r", stdin);
    cin >> n;
    cout << " So dinh cua do thi n = " << n << endl;
    // nhap ma tran lien ke.
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
                cin >> A[i][j];
            }
    }
}
int Kiemtra() 
{    
    int s, d;
    d = 0;
    for (int i = 1; i <= n; i++) {
        s = 0;
        for (int j = 1; j <= n; j++)
            s += A[i][j]; //đếm các bậc của các đỉnh của đồ thị
            if (s % 2) d++;
    }
    return d==0;
}
void Tim() {    
    int v, x, top, dCE;
    int stack[MAX], CE[MAX];
    top = 1;
    stack[top] = u; //thêm đỉnh u vào stack.
    dCE = 0;
    do {
        v = stack[top]; //lấy đỉnh trên cùng của stack.
            x = 1;
            while (x <= n && A[v][x] == 0) //tìm trong danh sách những đỉnh kề với đỉnh v.
                x++;
                if (x > n) { //lấy ra khỏi stack.
                dCE++;
                    CE[dCE] = v; //lưu đỉnh v vào mảng kết quả duyệt CE.
                    top--;
                } 
                else { //đỉnh x là đỉnh kề với đỉnh v.
                top++;
                    stack[top] = x;
                    A[v][x] = 0;
                    A[x][v] = 0;
                }
    } while (top != 0);
    cout << " Co chu trinh Euler:";
    for (x = dCE; x > 1; x--)
        cout << (char)(CE[x] + 'a' - 1) << "->"; //in ra kết quả dưới dạng char.
    cout<<(char)(CE[x] + 'a' - 1)<<endl;
}
int main(void) {    Init();
    if (Kiemtra())
        Tim();
        else printf("\n Khong co chu trinh Euler");
    return 0;
}
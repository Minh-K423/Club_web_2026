## Mở đầu

### Giới thiệu về chuỗi Markov và mô hình bài toán

Đã bao giờ bạn tự hỏi \"Làm thế nào mà người ta dự báo thời tiết ngày
mai?\". Để trả lời câu hỏi này, chúng ta có thể sử dụng một công cụ toán
học mang tên Chuỗi Markov. Thay vì phải phân tích dữ liệu khí tượng phức
tạp của cả tuần qua, chuỗi Markov hoạt động với một nguyên lý vô cùng
đơn giản: \"Thời tiết ngày mai chỉ phụ thuộc vào thời tiết ngày hôm
nay\". Mô hình chuỗi Markov cho phép chúng ta bỏ qua hoàn toàn chuỗi sự
kiện trong quá khứ mà có thể dựa vào tính toán, dự đoán được gần đúng
khả năng xảy ra của các sự kiện trong tương lai.

Về mặt toán học, mô hình chuỗi Markov thường được thiết lập dưới dạng
một \"bảng xác suất\", trong toán học thường được gọi là ma trận chuyển
trạng thái. Thực chất, ma trận này là một bảng tính đơn giản: hàng ngang
đại diện cho trạng thái \"hiện tại\", cột dọc là \"bước tiếp theo\", và
các ô vuông ở giữa chứa tỷ lệ phần trăm thay đổi. Thông qua nhiều lần
nhân các ma trận chuyển trạng thái này với nhau, chúng ta có thể dễ dàng
tính toán xem các sự kiện nào có khả năng xảy ra cao nhất trong tương
lai, mà hệ thống không hề bị quá tải dữ liệu bởi vì ta chỉ cần một hệ
thống dữ liệu trong hiện tại và bỏ qua được hàng tá dữ liệu xảy ra trước
đó.

Nhờ sự tối ưu và tính linh hoạt đó, chuỗi Markov đang âm thầm vận hành
vô số hệ thống quen thuộc quanh ta:

- Hệ thống gợi ý văn bản: Khi gõ tin nhắn, bàn phím điện thoại gợi ý từ
  tiếp theo chính là nhờ chuỗi Markov tính toán xem từ nào có xác suất
  đi liền kề cao nhất với từ bạn vừa gõ. Nó cũng là nền tảng sơ khai của
  các mô hình trí tuệ nhân tạo ngôn ngữ hiện nay.

- Thiết kế Trò chơi (Game Design): Trí tuệ nhân tạo của các nhân vật máy
  (NPC) trong game dùng chuỗi Markov để học và dự đoán chuỗi hành động,
  di chuyển tiếp theo của người chơi, từ đó đưa ra các phản xạ thông
  minh và chân thực hơn.

### Andrey Markov và sự phát hiện ra chuỗi Markov

Andrey Andreyevich Markov (1856--1922) là nhà toán học lỗi lạc người
Nga. Ông là người đặt nền móng cho lý thuyết các quá trình ngẫu nhiên và
nổi tiếng nhất với khái niệm \"Chuỗi Markov\" (Markov chains) -- nền
tảng quan trọng của ngành khoa học dữ liệu, vật lý hiện đại và trí tuệ
nhân tạo (AI) ngày nay.

Chuỗi Markov ra đời từ một cuộc tranh luận triết học và thần học tại Nga
xoay quanh vấn đề \"ý chí tự do\". Nhà toán học Andrey Markov đã tạo ra
mô hình này để phản bác quan điểm của Pavel Nekrasov (người cho rằng
tính ổn định thống kê chứng minh con người hoàn toàn độc lập và có ý chí
tự do).

Để chứng minh, Markov đã phân tích thủ công 20.000 ký tự đầu tiên trong
tiểu thuyết thơ Eugene Onegin của Pushkin. Ông chỉ ra xác suất của một
chữ cái phụ thuộc trực tiếp vào chữ cái ngay trước nó, khai sinh ra hệ
thống \"không có trí nhớ\" (tương lai chỉ phụ thuộc vào hiện tại).

Từ mục đích ban đầu là giải quyết một tranh cãi triết học, Chuỗi Markov
ngày nay đã trở thành nền tảng toán học cốt lõi cho AI, thuật toán tìm
kiếm, tài chính, thời tiết và công nghệ toàn cầu.

## Các kiến thức nền tảng

### Ma trận và phép nhân ma trận

Ta ký hiệu một ma trận $A$ gồm có $m$ hàng và $n$ cột là
$A=(a_{ij})_{m\times n}$, trong đó $a_{ij}$ là phần tử nằm ở hàng thứ
$i$ và cột thứ $j$. Ví dụ:

$$
A=\begin{pmatrix}
  1&2&3\\
  4&5&6
\end{pmatrix}
$$

Đây là một ma trận kích thước $2\times3$, với $a_{12}=2$ và $a_{23}=6$.
Nếu số hàng bằng số cột, ma trận được gọi là **ma trận vuông**.

Cho hai ma trận $A=(a_{ij})_{m\times n}$ và $B=(b_{ij})_{n\times k}$.
Khi ấy tích $C=AB$ là ma trận kích thước $m\times k$, có các phần tử

$$
c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

Như vậy, để tính $c_{ij}$, ta lấy các phần tử trên hàng thứ $i$ của $A$
nhân với các phần tử tương ứng trên cột thứ $j$ của $B$, rồi cộng các
kết quả. Ví dụ:

$$
\begin{pmatrix}
  1&2\\
  0&1
\end{pmatrix}
\begin{pmatrix}
  3&1\\
  2&4
\end{pmatrix}
=
\begin{pmatrix}
  7&9\\
  2&4
\end{pmatrix}
$$

Phép nhân ma trận có tính kết hợp: $(AB)C=A(BC)$ khi các tích được xác
định. Phép nhân ma trận không có tính giao hoán: ngay cả khi cả hai tích
đều được xác định, $AB$ không nhất thiết bằng $BA$.

### Xác suất có điều kiện và biến ngẫu nhiên

Xác suất của một biến cố $A$ được ký hiệu là $P(A)$, trong đó
$0\leq P(A)\leq1$. Cho hai biến cố $A$ và $B$, với $P(B)>0$. Xác suất để
$A$ xảy ra khi biết $B$ đã xảy ra được gọi là **xác suất có điều kiện**,
ký hiệu là $P(A\mid B)$ và được xác định bởi:

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},
$$

trong đó $A\cap B$ là biến cố cả $A$ và $B$ cùng xảy ra.
Ví dụ như khi gieo một con xúc xắc cân đối, gọi $A$ là biến cố "xuất
hiện số lớn hơn $3$" và $B$ là biến cố "xuất hiện số chẵn". Khi biết $B$
đã xảy ra, các kết quả có thể là $2,4,6$, trong đó có hai kết quả thỏa
mãn $A$. Khi ấy, $P(A\mid B)=\frac{2}{3}$.

Hai biến cố $A$ và $B$ được gọi là **độc lập** nếu $P(A\cap B)=P(A)P(B)$.
Khi $P(B)>0$, điều này tương đương với $P(A\mid B)=P(A)$, nghĩa là việc
biết $B$ đã xảy ra không làm thay đổi xác suất của $A$.
Cho các biến cố $B_1,\ldots,B_m$ đôi một xung khắc, có hợp bằng toàn bộ
không gian mẫu và thỏa mãn $P(B_i)>0$. Công thức xác suất toàn phần cho biết:

$$
P(A)=\sum_{i=1}^{m}P(B_i)P(A\mid B_i).
$$

Như vậy, ta có thể tính xác suất của $A$ bằng cách xét từng trường hợp
$B_i$, rồi cộng các đóng góp tương ứng.

Một **biến ngẫu nhiên** là một hàm gán cho mỗi kết quả của phép thử ngẫu
nhiên một số thực. Cho biến ngẫu nhiên rời rạc $X$ nhận các giá trị
$x_1,\ldots,x_m$. Ta ký hiệu $p_i=P(X=x_i)$ là xác suất để $X$ nhận giá
trị $x_i$. Các xác suất này tạo thành **phân phối xác suất** của $X$, trong đó:

$$
p_i\geq0,\qquad\sum_{i=1}^{m}p_i=1.
$$

Ví dụ như khi tung hai đồng xu cân đối và độc lập, gọi $X$ là số mặt ngửa
xuất hiện. Khi ấy $X$ nhận các giá trị $0,1,2$ với phân phối:

$$
P(X=0)=\frac14,\quad P(X=1)=\frac12,\quad P(X=2)=\frac14.
$$

## Xây dựng ma trận chuyển đổi trạng thái

### Các khái niệm cơ bản

**Định nghĩa 1** (Chuỗi Markov (Markov chain)). Chuỗi Markov là một quá
trình ngẫu nhiên, tức một họ biến ngẫu nhiên $(X_{n})_{n\ge0}$, được
quan sát theo thời gian $n=1, 2, \ldots.$

**Định nghĩa 2** (Không gian trạng thái (State space)). Mỗi giá trị có
thể có của $X_{n}$ được gọi là một trạng thái và tập hợp các trạng thái
được gọi là không gian trạng thái, thường được ký hiệu là $S$.

Chẳng hạn, nếu theo dõi thời tiết mỗi ngày thì có thể chọn
$S = \{\text{Mưa, Nắng}\}$. Hay đối với số dư tài khoản thì tập trạng
thái là tập số tự nhiên $S=\mathbb{N}$ (theo đơn vị đồng).

**Định nghĩa 3** (Tính chất Markov (Markov property)). Quá trình
$(X_{n})_{n\ge0}$ có tính chất Markov nếu xác suất để hệ thống chuyển
sang trạng thái tiếp theo chỉ phụ thuộc vào trạng thái hiện tại và không
phụ thuộc vào chuỗi các trạng thái trước đó. Cụ thể:

$$
\mathbb{P}(X_{n+1}=j \mid X_n = i, X_{n-1} = i_{n-1}, \dots, X_0 = i_0) = \mathbb{P}(X_{n+1} = j \mid X_n = i).
$$

*Nhận xét 1* (Ý nghĩa của tính chất Markov). Tính Markov không khẳng
định rằng tương lai hoàn toàn không liên quan đến quá khứ. Nó nói rằng
ảnh hưởng của quá khứ đến tương lai được tóm tắt qua trạng thái hiện
tại. Vì vậy, việc chọn trạng thái cần đủ thông tin cho mục tiêu mô hình
hóa; nếu trạng thái hiện tại không ghi nhận thông tin quan trọng, giả
thiết Markov có thể không phù hợp.

### Xác suất chuyển trạng thái

**Định nghĩa 4** (Xác suất chuyển trạng thái (Transition probability)).
Xét một chuỗi Markov $(X_n)_{n\ge 0}$ trên không gian trạng thái $S$.
Xác suất chuyển từ trạng thái $i$ ở thời điểm $n$ sang trạng thái $j$ ở
thời điểm $n+1$ được định nghĩa là:

$$
p_{ij}^{(n)} = \mathbb{P}(X_{n+1}=j \mid X_{n}=i).
$$

**Định nghĩa 5** (Tính thuần nhất theo thời gian (time-homogeneous)).
Nếu $p_{ij}^{(n)}$ là hằng số theo thời gian với mọi $n$, thì ta gọi
chuỗi Markov đó là thuần nhất. Khi đó, ta ký hiệu đơn giản là:

$$
p_{ij} = \mathbb{P}(X_{n+1}=j \mid X_{n}=i).
$$

Trong đó:

- $i, j \in S$: trạng thái hiện tại và trạng thái ở bước tiếp theo.

- $p_{ij}$: xác suất chuyển từ $i$ sang $j$.

Các xác suất chuyển trạng thái phải thỏa mãn hai điều kiện cơ bản:

$$
p_{ij} \ge 0, \quad \forall i, j \in S,
\qquad \sum_{j\in S} p_{ij} = 1, \quad \forall i \in S.
$$

### Sơ đồ chuyển trạng thái

**Định nghĩa 6** (Sơ đồ chuyển trạng thái (State transition diagram)).
Sơ đồ chuyển trạng thái là một đồ thị có hướng biểu diễn trực quan các
xác suất chuyển trạng thái của chuỗi Markov, trong đó thì:

- Mỗi trạng thái trong $S$ được biểu diễn bằng một đỉnh.

- Mũi tên từ $i$ đến $j$ mang nhãn $p_{ij}$ biểu diễn khả năng chuyển từ
  $i$ sang $j$ trong một bước.

- Mũi tên quay về chính đỉnh đó biểu diễn việc hệ thống giữ nguyên trạng
  thái.

**Ví dụ 1** (Sơ đồ trạng thái của một thiết bị). Xét một thiết bị có
không gian trạng thái $S = \{A, B, C\}$ tương ứng với: $A$ (đang hoạt
động), $B$ (bị hỏng) và $C$ (đang sửa chữa). Giả sử trong mỗi bước thời
gian:

- Khi đang hoạt động, thiết bị tiếp tục hoạt động với xác suất $0.85$;
  nếu không, nó bị hỏng.

- Khi bị hỏng, thiết bị chuyển sang trạng thái sửa chữa ở bước kế tiếp
  với xác suất $1$.

- Khi đang sửa chữa, thiết bị được sửa xong và hoạt động trở lại với xác
  suất $0.6$; nếu chưa sửa xong, nó tiếp tục được sửa chữa.

Các chuyển trạng thái có xác suất khác $0$ là:

- $A \xrightarrow{0.85} A$ và $A \xrightarrow{0.15} B$.
- $B \xrightarrow{1} C$.
- $C \xrightarrow{0.6} A$ và $C \xrightarrow{0.4} C$.

*Nhận xét 2*. Tại trạng thái $A$, tổng xác suất đi ra là
$0.85 + 0.15 = 1$; tại $B$ là $1 + 0 + 0 = 1$; còn tại $C$ là
$0.6 + 0.4 + 0 = 1$. Mỗi mũi tên biểu diễn một chuyển đổi trong đúng
một bước, kể cả khả năng giữ nguyên trạng thái qua các vòng lặp. Những
chuyển đổi có xác suất $0$ không được vẽ.

### Ma trận chuyển trạng thái

**Định nghĩa 7** (Ma trận chuyển trạng thái (Transition matrix)). Giả sử
không gian trạng thái hữu hạn gồm $m$ trạng thái, ta có thể ký hiệu tập
trạng thái là $S = \{s_1, s_2, \dots, s_m\}$ (hoặc đánh số đơn giản
$S = \{1, 2, \dots, m\}$). Sắp xếp các xác suất chuyển trạng thái
$p_{ij}$ thành ma trận chuyển trạng thái vuông cấp $m$, ký hiệu là
$\mathbf{P} = (p_{ij})_{m \times m}$:

$$
\mathbf{P} =
\begin{pmatrix}
  p_{11} & p_{12} & \cdots & p_{1m} \\
  p_{21} & p_{22} & \cdots & p_{2m} \\
  \vdots & \vdots & \ddots & \vdots \\
  p_{m1} & p_{m2} & \cdots & p_{mm}
\end{pmatrix}
$$

Ở đây ta quy ước:

- Hàng thứ $i$ biểu diễn trạng thái hiện tại.

- Cột thứ $j$ biểu diễn trạng thái tiếp theo.

- Phần tử ở hàng $i$, cột $j$ là xác suất $p_{ij}$.

**Ví dụ 2** (Ma trận chuyển trạng thái của thiết bị). Với thiết bị ở
**Ví dụ 1**, cả hàng và cột của $\mathbf{P}$ đều theo thứ tự $A, B, C$:

$$
\mathbf{P} =
\begin{pmatrix}
  0.85 & 0.15 & 0 \\
  0 & 0 & 1 \\
  0.6 & 0 & 0.4
\end{pmatrix}.
$$

### Các tính chất của ma trận chuyển trạng thái $\mathbf{P}$

**Tính chất 1** (Tính không âm). $p_{ij} \ge 0, \forall i,j \in S$, rõ
ràng vì $p_{ij} = \mathbb{P}(X_{n+1}=j \mid X_{n}=i) \geq 0$ do bản thân
nó là một giá trị của một đại lượng xác suất.

**Tính chất 2** (Tổng các phần tử trên một dòng bằng 1).
$\displaystyle\sum_{j \in S} p_{ij} = 1, \forall i \in S$. Khi hệ thống
đang ở trạng thái hiện tại $i$, nó bắt buộc phải chuyển sang một trạng
thái $j \in S$ bất kỳ ở bước tiếp theo (bao gồm cả khả năng giữ nguyên
trạng thái cũ qua các vòng lặp). Do không gian trạng thái $S$ đã bao
trùm mọi khả năng có thể xảy ra của hệ thống, tổng xác suất của tất cả
các biến cố rời rạc này trên cùng một hàng bắt buộc phải bằng $1$.

**Tính chất 3** (Phân bố xác suất qua ma trận $\mathbf{P}^n$). Ma trận
$\mathbf{P}^n$ cung cấp phân bố xác suất hệ thống chuyển từ trạng thái
$i$ sang trạng thái $j$ sau đúng $n$ bước thời gian. Để dễ theo dõi, ta
xét trường hợp ma trận $\mathbf{P}^2$ và gọi $p_{ij}^{(2)}$ là xác suất
để hệ thống chuyển từ trạng thái thứ $i$ sang trạng thái thứ $j$ sau $2$
bước thời gian. Chú ý rằng tập $\{X_{n+1} = k \mid 1 \leq k \leq n\}$
tạo nên hệ biến cố đầy đủ, nên ta có:

$$
\begin{aligned}
p_{ij}^{(2)} &= \sum_{k \in S} \mathbb{P}(X_{n+2} = j, X_{n+1} = k \mid X_n = i) \\
&= \sum_{k \in S} \mathbb{P}(X_{n+2} = j \mid X_{n+1} = k, X_n = i) \cdot \mathbb{P}(X_{n+1} = k \mid X_n = i) \\
&= \sum_{k \in S} \mathbb{P}(X_{n+2} = j \mid X_{n+1} = k) \cdot \mathbb{P}(X_{n+1} = k \mid X_n = i) \\
&= \sum_{k \in S} p_{ik} p_{kj}
\end{aligned}
$$

Các bước trên lần lượt áp dụng công thức xác suất toàn phần, quy tắc
nhân xác suất và tính chất Markov. Từ đó suy ra $(p_{ij}^{(2)}) = \mathbf{P}^2$. Hoàn toàn
tương tự, ta quy nạp được kết quả cho $\mathbf{P}^n$.

## Chuỗi Markov dự đoán tương lai như thế nào?

### Dùng ma trận $\mathbf{P}$ để dự đoán trạng thái tiếp theo

Ma trận $\mathbf{P}$ cung cấp trực tiếp phân bố xác suất có điều kiện
cho thời điểm tương lai gần. Để dự đoán trạng thái ở bước $n+1$ khi đã
biết hệ thống đang ở trạng thái $i$ tại bước $n$, ta trích xuất dữ liệu
trên hàng thứ $i$ của ma trận $\mathbf{P}$. Hàng này đóng vai trò như
một vector xác suất, biểu thị chính xác khả năng hệ thống sẽ rơi vào
từng trạng thái $j$ tương ứng.

**Ví dụ 3** (Đọc ma trận chuyển trạng thái của thiết bị). Nhìn lại ví dụ
về sự hoạt động của một thiết bị, ta có cách đọc ma trận $\mathbf{P}$
như sau:

- **Từ trạng thái $A$ (Đang hoạt động):** Quan sát hàng $1$, ta dự đoán
  thiết bị có xác suất $p_{AA} = 0.85$ tiếp tục hoạt động, xác suất
  $p_{AB} = 0.15$ sẽ bị hỏng, và xác suất $p_{AC} = 0$ chuyển thẳng sang
  trạng thái sửa chữa.

- **Từ trạng thái $B$ (Bị hỏng):** Quan sát hàng $2$, hệ thống chắc chắn
  $100\%$ sẽ chuyển sang trạng thái sửa chữa ở bước kế tiếp
  ($p_{BC} = 1$). Thiết bị không thể tự chuyển về trạng thái hoạt động
  ($p_{BA} = 0$) hay tiếp tục duy trì trạng thái hỏng mà không qua sửa
  chữa ($p_{BB} = 0$).

- **Từ trạng thái $C$ (Đang sửa chữa):** Quan sát hàng $3$, thiết bị có
  xác suất $p_{CA} = 0.6$ được sửa xong và quay lại hoạt động bình
  thường, và xác suất $p_{CC} = 0.4$ tiếp tục phải nằm ở trạng thái đang
  sửa chữa. Xác suất hư hỏng hoàn toàn từ trạng thái đang sửa chữa là
  $p_{CB} = 0$.

### Dự đoán trạng thái sau $n$ bước

Gọi $x^{(0)}$ là vector dòng thể hiện phân phối xác suất ban đầu của hệ
thống (trạng thái tại thời điểm $t=0$). Vector phân phối trạng thái tại
bước thứ $n$, ký hiệu là $x^{(n)}$, có thể được biểu diễn thông qua định
lý sau:

**Định lý 1**. Trạng thái của chuỗi Markov sau $n$ bước được xác định
bởi phương trình:

$$
x^{(n)} = x^{(0)}\mathbf{P}^n
$$

**Chứng minh:** Ta sẽ chứng minh mệnh đề bằng phương pháp quy nạp

- **Bước cơ sở:** Khi $n = 1$, theo định nghĩa của ma trận chuyển đổi
  một bước, xác suất để hệ thống ở trạng thái $j$ tại thời điểm $t=1$
  được tính bằng tổng xác suất hệ thống xuất phát từ một trạng thái $i$
  bất kỳ và chuyển sang $j$. Dưới dạng ma trận, ta có:
  $x^{(1)} = x^{(0)}\mathbf{P}^1$. Vậy mệnh đề đúng với $n=1$.

- **Bước quy nạp:** Giả sử mệnh đề đúng với $n = k$ ($k \ge 1$), tức là
  ta có phân phối trạng thái tại bước $k$ là:
  $x^{(k)} = x^{(0)}\mathbf{P}^k$. Ta cần chứng minh mệnh đề đúng với
  $n = k + 1$. Xét trạng thái hệ thống tại bước thứ $k+1$, nó hoàn toàn
  được quyết định bởi trạng thái tại bước thứ $k$ (tính chất Markov) và
  ma trận chuyển đổi một bước $\mathbf{P}$. Do đó:

  $$
  x^{(k+1)} = x^{(k)}\mathbf{P}
  $$

  Thay giả thiết quy nạp $x^{(k)} = x^{(0)}\mathbf{P}^k$ vào phương trình
  trên, ta được:

  $$
  x^{(k+1)} = (x^{(0)}\mathbf{P}^k)\mathbf{P} = x^{(0)}(\mathbf{P}^k \mathbf{P}) = x^{(0)}\mathbf{P}^{k+1}
  $$

  Vậy, theo nguyên lý quy nạp toán học, $x^{(n)} = x^{(0)}\mathbf{P}^n$
  đúng với mọi $n \ge 1$.

$\square$

**Tính $\mathbf{P}^n$ qua chéo hóa ma trận:**

Việc nhân ma trận $\mathbf{P}$ với chính nó $n$ lần đòi hỏi khối lượng
tính toán khổng lồ khi $n$ lớn. Để tối ưu, ta thường sử dụng phương pháp
chéo hóa. Trong trường hợp $\mathbf{P}$ có thể chéo hóa được thì sẽ tồn
tại các ma trận $\mathbf{S}$ chứa các vector riêng của $\mathbf{P}$ sao
cho $\mathbf{P} = \mathbf{S} \mathbf{D} \mathbf{S}^{-1}$, với
$\mathbf{D}$ là ma trận đường chéo chứa các giá trị riêng của
$\mathbf{P}$. Khi đó:

$$
\mathbf{P}^n = (\mathbf{S} \mathbf{D} \mathbf{S}^{-1})^n = (\mathbf{S} \mathbf{D} \mathbf{S}^{-1})(\mathbf{S} \mathbf{D} \mathbf{S}^{-1})\dots(\mathbf{S} \mathbf{D} \mathbf{S}^{-1}) = \mathbf{S} \mathbf{D}^n \mathbf{S}^{-1}
$$
Vì $\mathbf{D}$ là ma trận đường chéo, $\mathbf{D}^n$ đơn giản là việc
lũy thừa bậc $n$ từng phần tử trên đường chéo, giúp việc tính
$\mathbf{P}^n$ trở nên cực kỳ hệ thống và nhanh chóng.

### Trạng thái dừng

Một câu hỏi mang tính nền tảng trong lý thuyết chuỗi Markov là: Điều gì
sẽ xảy ra với hệ thống khi thời gian trôi đi vô hạn, tức là khi
$n \to \infty$? Phân tích hành vi tiệm cận này dẫn chúng ta đến một
trong những khái niệm quan trọng sau.

**Định nghĩa 8**. Một vector xác suất
$\pi = \begin{pmatrix} \pi_1 & \pi_2 & \dots & \pi_k \end{pmatrix}$ được
gọi là vector phân phối trạng thái dừng (stationary distribution vector)
của chuỗi Markov với ma trận chuyển trạng thái $\mathbf{P}$ nếu nó thỏa
mãn đồng thời hai điều kiện:

1.  $\pi \mathbf{P} = \pi$

2.  $\displaystyle\sum_{i=1}^k \pi_i = 1$ và
    $\pi_i \ge 0 \quad \forall i$

Ý nghĩa của phương trình $\pi \mathbf{P} = \pi$ là: Khi hệ thống đạt đến
phân phối $\pi$, thì bất kỳ sự chuyển đổi tiếp theo nào qua ma trận
$\mathbf{P}$ cũng không làm thay đổi phân phối này. Hệ thống đã đạt đến
trạng thái cân bằng động.

**Định nghĩa 9**. Chuỗi Markov được gọi là chính quy (regular) nếu tồn
tại một số nguyên dương $m$ sao cho mọi phần tử của $\mathbf{P}^m$ đều
lớn hơn $0$.

**Định lý 2** (Định lý giới hạn của chuỗi Markov). Đối với một chuỗi
Markov chính quy thì khi $n \to \infty$, ta có:

1.  $\displaystyle\lim_{n \to \infty} \mathbf{P}^n = \mathbf{P}^\infty$
    tồn tại.

2.  Mọi dòng của ma trận giới hạn $\mathbf{P}^\infty$ đều giống hệt nhau
    và chính là vector trạng thái dừng $\pi$.

3.  $\displaystyle\lim_{n \to \infty} x^{(n)} = \displaystyle\lim_{n \to \infty} x^{(0)} \mathbf{P}^n = \pi$,
    hoàn toàn **độc lập** với trạng thái khởi tạo $x^{(0)}$.

**Ví dụ 4** (Tính vector trạng thái dừng và ma trận giới hạn của thiết
bị). Xét lại ma trận $\mathbf{P}$ của thiết bị ở **Ví dụ 2**, với hàng
và cột theo thứ tự $A, B, C$:

$$
\mathbf{P} =
\begin{pmatrix}
  0.85 & 0.15 & 0 \\
  0 & 0 & 1 \\
  0.6 & 0 & 0.4
\end{pmatrix}.
$$

1.  Tìm vector trạng thái dừng
    $\pi = \begin{pmatrix} \pi_A & \pi_B & \pi_C \end{pmatrix}$

    $\pi$ thỏa mãn hệ phương trình:

    $$
    \begin{cases}
      \pi \mathbf{P} = \pi \\
      \pi_A + \pi_B + \pi_C = 1
    \end{cases}
    $$

    Khai triển phương trình ma trận $\pi \mathbf{P} = \pi$, ta được hệ
    phương trình tuyến tính:

    $$
    \begin{cases}
    0.85\pi_A + 0.6\pi_C = \pi_A \\
    0.15\pi_A = \pi_B \\
    \pi_B + 0.4\pi_C = \pi_C
    \end{cases}
    \implies
    \begin{cases}
    0.15\pi_A = 0.6\pi_C \\
    \pi_B = 0.15\pi_A
    \end{cases}
    $$

    Thay vào phương trình $\pi_A + \pi_B + \pi_C = 1$ ta
    được $\pi_A = \dfrac{5}{7}$ và do đó $\pi_B = \dfrac{3}{28}$ và
    $\pi_C = \dfrac{5}{28}$.

    Vậy vector trạng thái dừng của hệ thống là:

    $$
    \pi = \begin{pmatrix} \dfrac{5}{7} & \dfrac{3}{28} & \dfrac{5}{28} \end{pmatrix}
    $$

2.  Xác định ma trận giới hạn $\mathbf{P}^\infty$

    Ta tính toán được

    $$
    \mathbf{P}^2 = \mathbf{P} \times \mathbf{P} = \begin{pmatrix} 0.7225 & 0.1275 & 0.15 \\ 0.6 & 0 & 0.4 \\ 0.75 & 0.09 & 0.16 \end{pmatrix}
    $$
    nên chuỗi Markov này là chính quy.

    Vậy theo định lý giới hạn của chuỗi Markov hì khi $n \to \infty$,
    mọi dòng của ma trận giới hạn $\mathbf{P}^\infty$ đều giống hệt nhau
    và chính là vector trạng thái dừng $\pi,$ cụ thể là

    $$
    \mathbf{P}^\infty = \begin{pmatrix}
    \pi \\ \pi \\ \pi
    \end{pmatrix} = \begin{pmatrix}
    \dfrac{5}{7} & \dfrac{3}{28} & \dfrac{5}{28} \\[6pt]
    \dfrac{5}{7} & \dfrac{3}{28} & \dfrac{5}{28} \\[6pt]
    \dfrac{5}{7} & \dfrac{3}{28} & \dfrac{5}{28}
    \end{pmatrix}
    $$

### Tuy nhiên $\mathbf{P}^n$ không phải lúc nào cũng hội tụ

Mặc dù định lý giới hạn đảm bảo sự hội tụ cho các chuỗi Markov chính
quy, trên thực tế, **không phải lúc nào $\mathbf{P}^n$ cũng hội tụ khi
$n \to \infty$**. Sự không hội tụ này thường bắt nguồn từ các cấu trúc
đặc thù của không gian trạng thái, phổ biến nhất là tính chất **chu kỳ
(periodicity)** của chuỗi.

**Định nghĩa 10**. Một trạng thái $i$ được gọi là có chu kỳ $d$ nếu số
bước để đi từ $i$ trở về chính nó luôn là bội số của $d$ (với $d > 1$ là
ước chung lớn nhất của các độ dài đường đi khép kín).

Nếu chuỗi Markov có chứa các trạng thái có chu kỳ, ma trận
$\mathbf{P}^n$ sẽ không tiến tới một giới hạn duy nhất mà sẽ dao động
liên tục.

Ta xét một phản ví dụ sau: Xét một hệ thống có $2$ trạng thái chuyển đổi
qua lại liên tục theo một quy luật tất định: từ $1$ chắc chắn sang $2$,
và từ $2$ chắc chắn về $1$. Ma trận chuyển trạng thái của hệ thống này
là:

$$
\mathbf{P} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}
$$

Gọi $\mathbf{I}$ là ma trận đơn vị. Ta tính $\mathbf{P}^n$ theo các giá trị của $n$:

- Với $n = 2$:

  $$
  \mathbf{P}^2 = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \mathbf{I}
  $$

- Với $n = 3$:

  $$
  \mathbf{P}^3 = \mathbf{P}^2 \times \mathbf{P} = \mathbf{I} \times \mathbf{P} = \mathbf{P} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}
  $$

- Với $n = 4$:

  $$
  \mathbf{P}^4 = \mathbf{P}^3 \times \mathbf{P} = \mathbf{P} \times \mathbf{P} = \mathbf{P}^2 = \mathbf{I}
  $$

Bằng quy nạp, ta dễ dàng chứng minh được công thức tổng quát:

$$
\mathbf{P}^n =
\begin{cases}
\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} = \mathbf{P} & n \equiv 1 \pmod{2} \\
\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \mathbf{I} & n \equiv 0 \pmod{2}
\end{cases}
$$

Nói cách khác, $\mathbf{P}^n$ bằng $\mathbf{P}$ khi $n$ lẻ và bằng
$\mathbf{I}$ khi $n$ chẵn.

**Kết luận từ phản ví dụ:**

Khi cho $n \to \infty$, dãy ma trận $\mathbf{P}^n$ sẽ dao động vô tận
giữa $\mathbf{P}$ và $\mathbf{I}$. Do đó, giới hạn
$\displaystyle\lim_{n \to \infty} \mathbf{P}^n$ **không tồn tại**. Mặc
dù hệ thống này vẫn có thể giải được phương trình trạng thái dừng
$\pi = \pi \mathbf{P}$ (với nghiệm
$\pi = \begin{bmatrix} 0.5 & 0.5 \end{bmatrix}$), nhưng phân phối xác
suất thực tế của hệ thống qua từng bước $x^{(n)}$ không bao giờ ổn định
tại $\pi$ này mà liên tục thay đổi giữa trạng thái $1$ hoặc trạng thái
$2$ (tùy thuộc vào thời điểm quan sát).

## Một số ứng dụng

Nếu từng lướt qua những ma trận chuyển trạng thái hay công thức xác suất
của Chuỗi Markov và cảm thấy hơi "tiền đình", hãy thử tạm gác những ký
hiệu toán học sang một bên. Bởi đằng sau mô hình xác suất tưởng chừng
khô khan này là một ý tưởng khá gần gũi: "Sử dụng hiện tại để dự đoán
tương lai chứ không quan tâm trước đó là gì".

Vậy một ý tưởng có vẻ giản dị như thế còn có ích gì trong thời đại trí
tuệ nhân tạo phát triển mạnh mẽ? Chẳng phải những mô hình thuật toán
hiện đại hay các mô hình học sâu chuyên dự báo đã vượt xa các phương
pháp truyền thống như Markov từ lâu rồi hay sao?

### Ứng dụng trong xử lý ngôn ngữ tự nhiên (Natural Language Processing — NLP)

Một trong những ứng dụng tiêu biểu của Chuỗi Markov là xử lý ngôn ngữ tự
nhiên (Natural Language Processing - NLP), lĩnh vực giúp máy tính xử lý
và phân tích ngôn ngữ của con người. Dự đoán từ tiếp theo khi nhắn tin,
nhận diện giọng nói, tạo văn bản tự động đều là ứng dụng của NLP. Thuật
toán dựa trên nguyên lí cơ bản: "Với những gì đã biết, ta có thể đoán
được từ hoặc đơn vị ngôn ngữ nào có khả năng xuất hiện tiếp theo ở trong
câu". Ví dụ, sau cụm "Chúc mừng", từ "sinh" có thể có xác suất xuất hiện
cao hơn nhiều từ khác. Khi kết hợp xác suất của các bước nối tiếp, mô
hình có thể tạo ra một câu có khả năng xuất hiện cao và hợp ngữ cảnh một
cách tương đối.

Hiện nay, các mô hình ngôn ngữ thống kê đã cải tiến sử dụng mô hình
$n$-gram, trong đó xác suất của từ tiếp theo được ước lượng dựa trên một
nhóm gồm tối đa $(n-1)$ từ đứng trước. Ví dụ, mô hình bigram xét một từ
trước đó, còn mô hình trigram xét hai từ trước đó. Với cụm "Chúc mừng
sinh...", một mô hình trigram có thể học rằng từ "nhật" thường xuất hiện
tiếp theo. Khi cần tạo câu, mô hình lần lượt lựa chọn từ tiếp theo dựa
trên xác suất đã học, rồi tiếp tục dự đoán từ kế tiếp từ ngữ cảnh vừa
được cập nhật. Bằng cách kết hợp xác suất của nhiều bước, hệ thống có
thể tạo ra một câu hợp ngữ cảnh với xác suất cao nhất.

Ngày nay, những mô hình ngôn ngữ lớn như ChatGPT, Gemini hay Claude chủ
yếu dựa trên mô hình Transformer. Các AI này có thể dự đoán từ ngữ,
thông tin và bối cảnh dựa trên các đơn vị token tiếp theo, nhưng có thể
khai thác thông tin từ nhiều vị trí trong văn bản, thay vì chỉ đơn thuần
áp dụng chuỗi Markov đơn giản. Sự tưởng đồng giữa các mô hình hiện đại
và mô hình Markov nằm ở bài toán dự đoán tuần tự: cả hai đều có thể tạo
văn bản bằng cách dự đoán đơn vị tiếp theo dựa trên ngữ cảnh đã có và có
logic cốt lõi vẫn dựa trên các mối quan hệ giữa các từ.

Mặc dù dần bị thay thế bởi các mô hình hiện đại, mô hình Markov cổ điển
vẫn có ý nghĩa trong việc dự đoán tin nhắn tiếp theo, hay lấp đầy những
từ không nghe rõ khi chuyển một đoạn ghi âm sang chữ dựa vào những từ
trước đó, nhưng quan trọng hơn hết, nó đặt nền móng cho các mô hình ngôn
ngữ lớn và giúp chúng ta hiểu một nguyên lý quan trọng: ngôn ngữ có thể
được mô hình hóa thông qua xác suất của những khả năng tiếp nối nhau.

### Ứng dụng trong tạo ảnh AI

Vậy là một thuật toán huyền thoại đã dần bị đào thải trong thời đại
"công nghệ cao" này sao? Đúng nhưng chưa đủ. Có một nghịch lý thú vị:
Khi giả định "chỉ quan tâm đến hiện tại, quên đi toàn bộ quá khứ" của
Markov thất thế trong việc hiểu chiều sâu của một bài văn hay một cuốn
tiểu thuyết, thì chính nó lại tìm thấy sàn diễn rực rỡ nhất ở một nơi
không ai ngờ tới --- Diffusion Models, trái tim của Midjourney, Stable
Diffusion hay Flux.

Người ta thường thắc mắc: Làm sao cỗ máy có thể "vẽ" ra một bức tranh
sơn dầu, một khung cảnh viễn tưởng hay chân dung chi tiết đến từng sợi
tóc chỉ từ một dòng văn bản ngắn ngủi?

Thực ra, AI không hề cầm cọ vẽ từng nét theo cách con người hình dung.
Bản chất của quá trình này giống như một nhà điêu khắc đang tìm kiếm bức
tượng bị phong ấn bên trong một khối đá thô ráp --- và công cụ duy nhất
mà nó sử dụng chính là Chuỗi Markov hai chiều: phá hủy và tái sinh.

**Chiều thuận: Rải nhiễu**

Hãy tưởng tượng bạn nhỏ một giọt mực đen vào ly nước trong veo:

1\. Ở giây thứ nhất, giọt mực bung ra thành từng vệt khói nhỏ.

2\. Qua từng giây tiếp theo, các hạt mực khuếch tán ngẫu nhiên, hòa lẫn
vào các phân tử nước.

3\. Sau vài phút, bạn chẳng còn thấy giọt mực đâu nữa, chỉ còn lại một
ly nước đục ngầu vô định hình.

Trong huấn luyện AI, người ta cũng làm y hệt như vậy với hàng triệu bức
tranh:

Bắt đầu bằng một bức ảnh rõ nét hoàn hảo ($x_0$), mô hình thêm vào một
lượng nhiễu Gaussian cực nhỏ ($x_1$). Rồi từ bức ảnh hơi nhiễu đó, nó
lại phủ tiếp một lớp hạt li ti khác ($x_2$). Quá trình cứ lặp lại hàng
trăm bước như một chuỗi dây chuyền: trạng thái nhiễu ở bước $t$ chỉ sinh
ra trực tiếp từ bước $t-1$ ngay trước đó. Đây là một chuỗi Markov thuận
(Forward Markov Chain) kinh điển.

Đến bước cuối cùng (thường là bước 1000), bức tranh hoàn toàn biến mất,
chỉ còn lại một màn hình nhiễu hạt tuyết trắng xóa --- tương đương với
sự hỗn loạn tuyệt đối (maximum entropy).

Bạn có thể thắc mắc ở đây rằng tại sao phải tốn nhiều bước như vậy chỉ
để tạo ra một bức ảnh nhiễu? Tại sao không dùng một bức ảnh màu trắng
hoàn hảo với mọi pixel là (255, 255, 255). Câu trả lời là AI cần một bức
tranh nhiễu để có "manh mối" để thực hiện bước sau đây, vì AI chỉ được
học là "à, với hình ảnh con chó thì khả năng cao phần nhiễu này cần thay
đổi nè".

**Chiều nghịch: Khử nhiễu**

Đây chính là lúc điều kỳ diệu xuất hiện. Trong suốt quá trình rải nhiễu
ở chiều thuận, mô hình đã âm thầm học cách trả lời một câu hỏi: "Nếu tôi
đang đứng ở bước nhiễu $t$, làm thế nào để gạt bớt một phần cát vừa rải
để lùi về bước $t-1$ sạch hơn một chút?"

Khi bạn gõ vào prompt yêu cầu tạo ảnh:

1\. AI không vẽ ngay. Nó bốc ngẫu nhiên một khung hình nhiễu trắng thuần
túy --- một mớ hạt tĩnh điện vô nghĩa.

2\. Nhìn vào đống nhiễu hiện tại cùng với từ khóa gợi ý của bạn, AI ước
tính lượng nhiễu dư thừa và "gọt" đi một lớp mỏng, đưa bức ảnh về trạng
thái ít nhiễu hơn một tấc.

3\. Lặp lại chu kỳ đó: trạng thái mới lại trở thành "hiện tại", AI lại
nhìn vào nó để gọt tiếp lớp tiếp theo.

Cứ sau mỗi bước lùi của chuỗi Markov nghịch (Reverse Markov Chain), từ
một mớ nhiễu vô vọng, những mảng màu lớn dần thành hình, các đường viền
bắt đầu sắc cạnh, ánh sáng xuất hiện, và cuối cùng, một bức tranh hoàn
chỉnh lộ diện ngoạn mục sau làn sương mù.

**Sức mạnh của việc "quên đi quá khứ"**

Tại sao mô hình lại chạy mượt mà đến thế? Bí quyết nằm trọn vẹn ở tính
chất Markov.

Để gọt bớt một lớp nhiễu ở bước thứ 450, AI không cần phải lật lại lịch
sử xem bức ảnh trông như thế nào ở bước 500 hay lúc còn là màn hình
trắng tinh ở bước 1000. Toàn bộ thông tin nó cần đều đã nằm trọn vẹn
trong cấu trúc của bức ảnh ở ngay bước 450. Nó giải phóng bộ nhớ khổng
lồ, biến một bài toán tưởng chừng bất khả thi thành các phép tính xác
suất cục bộ cực kỳ tinh gọn.

Từ một lý thuyết xác suất từng bị xem là "quá đơn giản và thiếu trí nhớ"
trước những mô hình ngôn ngữ khổng lồ, Chuỗi Markov đã có một cú lội
ngược dòng ngoạn mục. Nó chứng minh rằng: Đôi khi đỉnh cao của sáng tạo
không nằm ở việc nhớ thật nhiều chuyện của quá khứ, mà là khả năng đưa
ra quyết định chuẩn xác nhất cho bước chuyển tiếp ngay tại thời điểm
hiện tại.

## Tổng kết

Từ câu hỏi gần gũi "Nếu hôm nay trời mưa thì xác suất ngày mai trời cũng
mưa là bao nhiêu?", chuỗi Markov cho chúng ta một cách diễn đạt rõ ràng
về sự bất định. Mô hình không khẳng định rằng tương lai có thể được biết
trước một cách chắc chắn. Thay vào đó, nó mô tả khả năng chuyển từ trạng
thái hiện tại sang những trạng thái tiếp theo bằng xác suất. Điểm cốt
lõi là tính Markov: khi đã biết trạng thái hiện tại, phân phối xác suất
của trạng thái kế tiếp không còn phụ thuộc vào toàn bộ lịch sử trước đó.

Với không gian trạng thái $S=\{1,2,\ldots,m\}$, đại lượng
$p_{ij}=\mathbb{P}(X_{n+1}=j\mid X_n=i)$ biểu diễn xác suất hệ chuyển
từ trạng thái $i$ sang trạng thái $j$ sau một bước. Các xác suất được
sắp xếp trong ma trận chuyển trạng thái $P=(p_{ij})$, với $p_{ij}\geq 0$
và tổng mỗi hàng bằng $1$. Nếu $\pi_0$ là vector hàng mô tả phân phối
ban đầu, thì $\pi_n=\pi_0P^n$ cho biết phân phối xác suất sau $n$
bước. Vì vậy, cùng một mô hình có thể khảo sát cả bước chuyển kế tiếp
lẫn hành vi sau nhiều bước.

Khi xem xét quá trình trong thời gian dài, ta gặp khái niệm phân phối
dừng. Vector xác suất $\pi$ là phân phối dừng nếu $\pi=\pi P$. Nếu hệ
bắt đầu với $\pi$, phân phối của nó sẽ không thay đổi qua các bước tiếp
theo. Tuy nhiên, sự tồn tại của phân phối dừng không đồng nghĩa với việc
$P^n$ luôn hội tụ, sự hội tụ còn phụ thuộc vào nhiều yếu tố khác. Phân
biệt hai khái niệm này giúp tránh diễn giải không có cơ sở các kết quả
dài hạn.

Các ví dụ và ứng dụng cho thấy nhiều hiện tượng ngẫu nhiên vẫn có thể
được mô hình hóa bằng một cấu trúc toán học tương đối gọn. Dự báo thời
tiết, hệ thống gợi ý và một số bài toán xử lý ngôn ngữ tự nhiên đều có
thể được tiếp cận bằng trạng thái và xác suất chuyển. Dẫu vậy, chất
lượng dự đoán còn phụ thuộc vào cách chọn trạng thái, dữ liệu dùng để
ước lượng xác suất và mức độ phù hợp của giả thiết Markov với thực tế.

Từ nền tảng này, người đọc có thể tiếp tục tìm hiểu trạng thái hấp thụ,
thời gian chạm, chuỗi Markov thời gian liên tục, mô hình Markov ẩn hoặc
quá trình quyết định Markov. Chuỗi Markov không biến tương lai thành
điều chắc chắn; giá trị của nó nằm ở khả năng biến sự bất định thành một
đối tượng có thể mô tả, tính toán và phân tích bằng toán học.

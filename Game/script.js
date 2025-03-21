// Data tantangan
const challenges = [
    // Tantangan JavaScript yang sudah ada
    {
        title: "Tantangan 1: Hitung Jumlah Elemen Dalam Array",
        description: "Buatlah sebuah fungsi bernama <code>countElements</code> yang menerima sebuah array sebagai parameter dan mengembalikan jumlah elemen yang ada dalam array tersebut.",
        examples: "countElements([1, 2, 3, 4, 5]) -> 5\ncountElements([]) -> 0",
        initialCode: "function countElements(arr) {\n  // Tulis kode kamu di sini\n  \n}\n\n// Jangan ubah kode di bawah ini\nconsole.log(countElements([1, 2, 3, 4, 5]));\nconsole.log(countElements([]));\n",
        hint: "Gunakan properti length dari array untuk mendapatkan jumlah elemen.",
        difficulty: "beginner",
        estimatedTime: "15 menit",
        path: "js",
        test: function(userCode) {
            try {
                // Reset console log
                console_logs = [];
                
                // Evaluasi kode pengguna
                eval(userCode);
                
                // Periksa output
                return console_logs[0] === 5 && console_logs[1] === 0;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    {
        title: "Tantangan 2: Filter Array Bilangan Genap",
        description: "Buatlah sebuah fungsi bernama <code>filterEven</code> yang menerima sebuah array bilangan sebagai parameter dan mengembalikan array baru yang hanya berisi bilangan genap.",
        examples: "filterEven([1, 2, 3, 4, 5]) -> [2, 4]\nfilterEven([1, 3, 5]) -> []",
        initialCode: "function filterEven(numbers) {\n  // Tulis kode kamu di sini\n  \n}\n\n// Jangan ubah kode di bawah ini\nconsole.log(filterEven([1, 2, 3, 4, 5]));\nconsole.log(filterEven([1, 3, 5]));\n",
        hint: "Gunakan method filter() dan operator modulo (%) untuk memeriksa bilangan genap.",
        difficulty: "beginner",
        estimatedTime: "20 menit",
        path: "js",
        test: function(userCode) {
            try {
                // Reset console log
                console_logs = [];
                
                // Evaluasi kode pengguna
                eval(userCode);
                
                // Periksa output (dengan konversi ke string untuk perbandingan array)
                return JSON.stringify(console_logs[0]) === JSON.stringify([2, 4]) && 
                       JSON.stringify(console_logs[1]) === JSON.stringify([]);
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    {
        title: "Tantangan 3: Hitung Rata-rata Data",
        description: "Buatlah sebuah fungsi bernama <code>calculateAverage</code> yang menerima sebuah array bilangan sebagai parameter dan mengembalikan nilai rata-rata dari bilangan tersebut. Jika array kosong, fungsi harus mengembalikan 0.",
        examples: "calculateAverage([1, 2, 3, 4, 5]) -> 3\ncalculateAverage([]) -> 0",
        initialCode: "function calculateAverage(numbers) {\n  // Tulis kode kamu di sini\n  \n}\n\n// Jangan ubah kode di bawah ini\nconsole.log(calculateAverage([1, 2, 3, 4, 5]));\nconsole.log(calculateAverage([]));\n",
        hint: "Gunakan method reduce() untuk menjumlahkan semua nilai dalam array, lalu bagi dengan panjang array. Jangan lupa untuk menangani kasus array kosong!",
        difficulty: "intermediate",
        estimatedTime: "25 menit",
        path: "js",
        test: function(userCode) {
            try {
                // Reset console log
                console_logs = [];
                
                // Evaluasi kode pengguna
                eval(userCode);
                
                // Periksa output
                return console_logs[0] === 3 && console_logs[1] === 0;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    // Tantangan JavaScript tambahan
    {
        title: "Tantangan 4: Palindrome Checker",
        description: "Buatlah sebuah fungsi bernama <code>isPalindrome</code> yang menerima sebuah string sebagai parameter dan mengembalikan boolean true jika string tersebut adalah palindrome (dapat dibaca sama dari depan dan belakang), atau false jika bukan. Fungsi harus mengabaikan spasi, tanda baca, dan perbedaan huruf besar-kecil.",
        examples: 'isPalindrome("radar") -> true\nisPalindrome("Madam, I\'m Adam") -> true\nisPalindrome("hello") -> false',
        initialCode: 'function isPalindrome(str) {\n  // Tulis kode kamu di sini\n  \n}\n\n// Jangan ubah kode di bawah ini\nconsole.log(isPalindrome("radar"));\nconsole.log(isPalindrome("Madam, I\'m Adam"));\nconsole.log(isPalindrome("hello"));\n',
        hint: "Bersihkan string dari karakter non-alphanumeric, ubah semua menjadi lowercase, kemudian bandingkan dengan string yang sudah dibalik.",
        difficulty: "intermediate",
        estimatedTime: "30 menit",
        path: "js",
        test: function(userCode) {
            try {
                console_logs = [];
                eval(userCode);
                return console_logs[0] === true && 
                       console_logs[1] === true && 
                       console_logs[2] === false;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    {
        title: "Tantangan 5: FizzBuzz",
        description: "Buat fungsi bernama <code>fizzBuzz</code> yang menerima parameter angka n, dan mengembalikan array berisi string dari 1 sampai n, dengan aturan: angka yang habis dibagi 3 diganti 'Fizz', angka yang habis dibagi 5 diganti 'Buzz', dan angka yang habis dibagi keduanya diganti 'FizzBuzz'.",
        examples: "fizzBuzz(15) -> [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']",
        initialCode: "function fizzBuzz(n) {\n  // Tulis kode kamu di sini\n  \n}\n\n// Jangan ubah kode di bawah ini\nconsole.log(fizzBuzz(15));\n",
        hint: "Gunakan perulangan untuk mengiterasi dari 1 sampai n, lalu periksa apakah angka habis dibagi 3, 5, atau keduanya dengan operator modulo (%).",
        difficulty: "beginner",
        estimatedTime: "20 menit",
        path: "js",
        test: function(userCode) {
            try {
                console_logs = [];
                eval(userCode);
                const expected = [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'];
                return JSON.stringify(console_logs[0]) === JSON.stringify(expected);
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    {
        title: "Tantangan 6: Cari Nilai Terbesar",
        description: "Buatlah fungsi bernama <code>findMax</code> yang menerima array 2 dimensi (array of arrays) dan mengembalikan nilai terbesar dari seluruh array.",
        examples: "findMax([[1, 2, 3], [4, 5], [6]]) -> 6\nfindMax([[-1, -2], [-3, -4]]) -> -1",
        initialCode: "function findMax(arr) {\n  // Tulis kode kamu di sini\n  \n}\n\n// Jangan ubah kode di bawah ini\nconsole.log(findMax([[1, 2, 3], [4, 5], [6]]));\nconsole.log(findMax([[-1, -2], [-3, -4]]));\n",
        hint: "Kamu bisa menggunakan metode flat() untuk membuat array 1 dimensi, lalu gunakan Math.max() untuk mencari nilai maksimum.",
        difficulty: "intermediate",
        estimatedTime: "25 menit",
        path: "js",
        test: function(userCode) {
            try {
                console_logs = [];
                eval(userCode);
                return console_logs[0] === 6 && console_logs[1] === -1;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    
    // Tantangan HTML
    {
        title: "Tantangan HTML 1: Membuat Struktur Halaman Web",
        description: "Buatlah struktur dasar halaman HTML yang terdiri dari doctype, html, head, dan body. Tambahkan judul 'Halaman Pertamaku' di dalam head tag, dan paragraf 'Halo Dunia!' di dalam body.",
        examples: "<!DOCTYPE html>\n<html>\n<head>\n  <title>Halaman Pertamaku</title>\n</head>\n<body>\n  <p>Halo Dunia!</p>\n</body>\n</html>",
        initialCode: "<!-- Tulis kode HTML kamu di sini -->\n\n",
        hint: "Pastikan kamu memulai dengan deklarasi DOCTYPE, lalu menambahkan tag html yang berisi head dan body. Head berisi tag title, dan body berisi tag p.",
        difficulty: "beginner",
        estimatedTime: "15 menit",
        path: "html",
        test: function(userCode) {
            try {
                // Cek apakah kode berisi elemen-elemen yang dibutuhkan
                const hasDoctype = /<!DOCTYPE html>/i.test(userCode);
                const hasHtmlTag = /<html.*?>[\s\S]*<\/html>/i.test(userCode);
                const hasHeadTag = /<head.*?>[\s\S]*<\/head>/i.test(userCode);
                const hasTitle = /<title.*?>[\s\S]*?Halaman Pertamaku[\s\S]*?<\/title>/i.test(userCode);
                const hasBodyTag = /<body.*?>[\s\S]*<\/body>/i.test(userCode);
                const hasParagraph = /<p.*?>[\s\S]*?Halo Dunia![\s\S]*?<\/p>/i.test(userCode);
                
                // Preview HTML
                const previewFrame = document.getElementById('preview-frame');
                if (previewFrame) {
                    previewFrame.style.display = 'block';
                    outputElement.style.display = 'none';
                    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                    doc.open();
                    doc.write(userCode);
                    doc.close();
                }
                
                return hasDoctype && hasHtmlTag && hasHeadTag && hasTitle && hasBodyTag && hasParagraph;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    {
        title: "Tantangan HTML 2: Membuat Formulir Kontak",
        description: "Buatlah sebuah formulir kontak dengan input nama, email, pesan, dan tombol submit. Setiap input harus memiliki label dan placeholder yang sesuai.",
        examples: '<form>\n  <div>\n    <label for="name">Nama:</label>\n    <input type="text" id="name" placeholder="Masukkan nama Anda">\n  </div>\n  <div>\n    <label for="email">Email:</label>\n    <input type="email" id="email" placeholder="Masukkan email Anda">\n  </div>\n  <div>\n    <label for="message">Pesan:</label>\n    <textarea id="message" placeholder="Tulis pesan Anda"></textarea>\n  </div>\n  <button type="submit">Kirim</button>\n</form>',
        initialCode: "<!-- Tulis kode HTML kamu di sini -->\n\n",
        hint: "Gunakan tag form sebagai container, gunakan tag label yang terhubung dengan input menggunakan atribut for dan id yang sama. Untuk area pesan, gunakan textarea.",
        difficulty: "intermediate",
        estimatedTime: "25 menit",
        path: "html",
        test: function(userCode) {
            try {
                // Cek apakah kode berisi elemen-elemen yang dibutuhkan
                const hasForm = /<form.*?>[\s\S]*<\/form>/i.test(userCode);
                const hasNameInput = /<input[^>]*type=["']text["'][^>]*id=["']name["'][^>]*>/i.test(userCode) || 
                                     /<input[^>]*id=["']name["'][^>]*type=["']text["'][^>]*>/i.test(userCode);
                const hasEmailInput = /<input[^>]*type=["']email["'][^>]*>/i.test(userCode);
                const hasTextarea = /<textarea.*?>[\s\S]*<\/textarea>/i.test(userCode);
                const hasSubmitButton = /<button[^>]*type=["']submit["'][^>]*>[\s\S]*<\/button>/i.test(userCode) || 
                                        /<input[^>]*type=["']submit["'][^>]*>/i.test(userCode);
                const hasLabels = /<label.*?>[\s\S]*<\/label>/i.test(userCode);
                
                // Preview HTML
                const previewFrame = document.getElementById('preview-frame');
                if (previewFrame) {
                    previewFrame.style.display = 'block';
                    outputElement.style.display = 'none';
                    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                    doc.open();
                    doc.write(userCode);
                    doc.close();
                }
                
                return hasForm && hasNameInput && hasEmailInput && hasTextarea && hasSubmitButton && hasLabels;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    {
        title: "Tantangan HTML 3: Membuat Tabel Data",
        description: "Buatlah sebuah tabel yang menampilkan daftar produk dengan kolom: No, Nama Produk, Harga, dan Stok. Tambahkan minimal 3 produk ke dalam tabel.",
        examples: '<table border="1">\n  <thead>\n    <tr>\n      <th>No</th>\n      <th>Nama Produk</th>\n      <th>Harga</th>\n      <th>Stok</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>1</td>\n      <td>Laptop</td>\n      <td>Rp 10.000.000</td>\n      <td>5</td>\n    </tr>\n    <!-- tambahkan produk lainnya -->\n  </tbody>\n</table>',
        initialCode: "<!-- Tulis kode HTML kamu di sini -->\n\n",
        hint: "Gunakan tag table untuk membuat tabel, thead untuk bagian header, tbody untuk isi tabel. Tag tr untuk baris, th untuk header kolom, dan td untuk data.",
        difficulty: "intermediate",
        estimatedTime: "30 menit",
        path: "html",
        test: function(userCode) {
            try {
                // Cek apakah kode berisi elemen-elemen yang dibutuhkan
                const hasTable = /<table.*?>[\s\S]*<\/table>/i.test(userCode);
                const hasHeader = /<th.*?>[\s\S]*?No[\s\S]*?<\/th>/i.test(userCode) && 
                                 /<th.*?>[\s\S]*?Nama Produk[\s\S]*?<\/th>/i.test(userCode) && 
                                 /<th.*?>[\s\S]*?Harga[\s\S]*?<\/th>/i.test(userCode) && 
                                 /<th.*?>[\s\S]*?Stok[\s\S]*?<\/th>/i.test(userCode);
                // Hitung jumlah baris data (tr dalam tbody atau tr secara langsung dalam table)
                const bodyRowMatch = userCode.match(/<tbody.*?>([\s\S]*?)<\/tbody>/i);
                let rowCount = 0;
                if (bodyRowMatch) {
                    rowCount = (bodyRowMatch[1].match(/<tr.*?>[\s\S]*?<\/tr>/gi) || []).length;
                } else {
                    // Jika tidak ada tbody, hitung tr langsung dalam table (kurangi baris header)
                    const trMatches = userCode.match(/<tr.*?>[\s\S]*?<\/tr>/gi) || [];
                    rowCount = trMatches.length > 0 ? trMatches.length - 1 : 0;
                }
                
                // Preview HTML
                const previewFrame = document.getElementById('preview-frame');
                if (previewFrame) {
                    previewFrame.style.display = 'block';
                    outputElement.style.display = 'none';
                    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                    doc.open();
                    doc.write(userCode);
                    doc.close();
                }
                
                return hasTable && hasHeader && rowCount >= 3;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    
    // Tantangan CSS
    {
        title: "Tantangan CSS 1: Styling Kartu Profil",
        description: "Buatlah styling untuk kartu profil dengan gambar, nama, dan deskripsi. Kartu harus memiliki bayangan (shadow), sudut bulat (rounded corner), dan efek hover.",
        examples: '<style>\n.profile-card {\n  width: 300px;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n  text-align: center;\n  transition: transform 0.3s;\n}\n\n.profile-card:hover {\n  transform: translateY(-5px);\n}\n\n.profile-img {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n}\n\n.profile-name {\n  margin-top: 15px;\n  font-size: 1.5em;\n}\n\n.profile-desc {\n  color: #666;\n  margin-top: 10px;\n}\n</style>\n\n<div class="profile-card">\n  <img src="https://via.placeholder.com/100" alt="Profile" class="profile-img">\n  <h2 class="profile-name">John Doe</h2>\n  <p class="profile-desc">Web Developer & Designer</p>\n</div>',
        initialCode: "<!-- HTML Struktur (jangan diubah) -->\n<div class=\"profile-card\">\n  <img src=\"https://via.placeholder.com/100\" alt=\"Profile\" class=\"profile-img\">\n  <h2 class=\"profile-name\">John Doe</h2>\n  <p class=\"profile-desc\">Web Developer & Designer</p>\n</div>\n\n<!-- Tulis CSS kamu di sini -->\n<style>\n\n</style>",
        hint: "Gunakan properti width, padding, border-radius, dan box-shadow untuk kartu. Gunakan border-radius: 50% untuk membuat gambar bulat. Gunakan :hover pseudo-class dan transform untuk efek hover.",
        difficulty: "beginner",
        estimatedTime: "20 menit",
        path: "css",
        test: function(userCode) {
            try {
                // Ekstrak CSS dari kode pengguna
                const styleMatch = userCode.match(/<style>([\s\S]*?)<\/style>/i);
                const css = styleMatch ? styleMatch[1] : '';
                
                // Periksa properti yang diperlukan
                const hasCardWidth = /\.profile-card\s*{[^}]*width\s*:/i.test(css);
                const hasCardBorderRadius = /\.profile-card\s*{[^}]*border-radius\s*:/i.test(css);
                const hasCardBoxShadow = /\.profile-card\s*{[^}]*box-shadow\s*:/i.test(css);
                const hasImgBorderRadius = /\.profile-img\s*{[^}]*border-radius\s*:/i.test(css);
                const hasHoverEffect = /\.profile-card:hover\s*{/i.test(css);
                
                // Preview HTML dengan CSS
                const previewFrame = document.getElementById('preview-frame');
                if (previewFrame) {
                    previewFrame.style.display = 'block';
                    outputElement.style.display = 'none';
                    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                    doc.open();
                    doc.write(userCode);
                    doc.close();
                }
                
                return hasCardWidth && hasCardBorderRadius && hasCardBoxShadow && hasImgBorderRadius && hasHoverEffect;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    {
        title: "Tantangan CSS 2: Membuat Layout Flexbox",
        description: "Buatlah layout dengan 3 kotak menggunakan Flexbox. Kotak harus tersusun secara horizontal, memiliki lebar yang sama, dan jarak yang sama di antara mereka.",
        examples: '<style>\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n}\n\n.flex-item {\n  flex: 1;\n  padding: 20px;\n  background-color: #f0f0f0;\n  text-align: center;\n  border-radius: 5px;\n}\n</style>\n\n<div class="flex-container">\n  <div class="flex-item">Item 1</div>\n  <div class="flex-item">Item 2</div>\n  <div class="flex-item">Item 3</div>\n</div>',
        initialCode: "<!-- HTML Struktur (jangan diubah) -->\n<div class=\"flex-container\">\n  <div class=\"flex-item\">Item 1</div>\n  <div class=\"flex-item\">Item 2</div>\n  <div class=\"flex-item\">Item 3</div>\n</div>\n\n<!-- Tulis CSS kamu di sini -->\n<style>\n\n</style>",
        hint: "Gunakan display: flex pada container, dan flex: 1 pada item untuk membuat semua item memiliki lebar yang sama. Gunakan justify-content: space-between untuk membuat jarak antara item.",
        difficulty: "intermediate",
        estimatedTime: "25 menit",
        path: "css",
        test: function(userCode) {
            try {
                // Ekstrak CSS dari kode pengguna
                const styleMatch = userCode.match(/<style>([\s\S]*?)<\/style>/i);
                const css = styleMatch ? styleMatch[1] : '';
                
                // Periksa properti yang diperlukan
                const hasFlexDisplay = /\.flex-container\s*{[^}]*display\s*:\s*flex\s*;/i.test(css);
                const hasJustifyContent = /\.flex-container\s*{[^}]*justify-content\s*:/i.test(css);
                const hasFlexItem = /\.flex-item\s*{[^}]*flex\s*:/i.test(css) || 
                                   /\.flex-item\s*{[^}]*flex-grow\s*:/i.test(css);
                
                // Preview HTML dengan CSS
                const previewFrame = document.getElementById('preview-frame');
                if (previewFrame) {
                    previewFrame.style.display = 'block';
                    outputElement.style.display = 'none';
                    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                    doc.open();
                    doc.write(userCode);
                    doc.close();
                }
                
                return hasFlexDisplay && hasJustifyContent && hasFlexItem;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    },
    {
        title: "Tantangan CSS 3: Desain Responsif dengan Media Queries",
        description: "Buatlah layout yang responsif dengan 2 kolom pada desktop dan 1 kolom pada mobile (lebar < 768px). Tambahkan juga perubahan ukuran font dan padding pada versi mobile.",
        examples: '<style>\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.row {\n  display: flex;\n  gap: 20px;\n}\n\n.column {\n  flex: 1;\n  padding: 20px;\n  background-color: #f0f0f0;\n}\n\n@media (max-width: 768px) {\n  .row {\n    flex-direction: column;\n  }\n  \n  .column {\n    padding: 15px;\n  }\n  \n  h2 {\n    font-size: 1.2em;\n  }\n}\n</style>\n\n<div class="container">\n  <div class="row">\n    <div class="column">\n      <h2>Kolom Pertama</h2>\n      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n    </div>\n    <div class="column">\n      <h2>Kolom Kedua</h2>\n      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n    </div>\n  </div>\n</div>',
        initialCode: "<!-- HTML Struktur (jangan diubah) -->\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"column\">\n      <h2>Kolom Pertama</h2>\n      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n    </div>\n    <div class=\"column\">\n      <h2>Kolom Kedua</h2>\n      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n    </div>\n  </div>\n</div>\n\n<!-- Tulis CSS kamu di sini -->\n<style>\n\n</style>",
        hint: "Gunakan display: flex untuk row pada desktop. Gunakan @media (max-width: 768px) untuk mendefinisikan aturan pada mobile. Di dalam media query, ubah flex-direction menjadi column.",
        difficulty: "advanced",
        estimatedTime: "35 menit",
        path: "css",
        test: function(userCode) {
            try {
                // Ekstrak CSS dari kode pengguna
                const styleMatch = userCode.match(/<style>([\s\S]*?)<\/style>/i);
                const css = styleMatch ? styleMatch[1] : '';
                
                // Periksa properti yang diperlukan
                const hasFlexDisplay = /\.row\s*{[^}]*display\s*:\s*flex\s*;/i.test(css);
                const hasMediaQuery = /@media\s*\(\s*max-width\s*:\s*768px\s*\)\s*{/i.test(css);
                const hasColumnDirection = /@media[^{]*{[^}]*\.row\s*{[^}]*flex-direction\s*:\s*column\s*;/i.test(css);
                
                // Preview HTML dengan CSS
                const previewFrame = document.getElementById('preview-frame');
                if (previewFrame) {
                    previewFrame.style.display = 'block';
                    outputElement.style.display = 'none';
                    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
                    doc.open();
                    doc.write(userCode);
                    doc.close();
                }
                
                return hasFlexDisplay && hasMediaQuery && hasColumnDirection;
            } catch (error) {
                outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
                return false;
            }
        }
    }
];

// Badge data yang ditingkatkan
const badges = [
    {
        name: "JavaScript Beginner",
        description: "Menyelesaikan semua tantangan JavaScript level Beginner",
        icon: "🔰",
        requirement: function() {
            return getCompletedChallengesByPathAndDifficulty('js', 'beginner') >= 3;
        }
    },
    {
        name: "JavaScript Intermediate",
        description: "Menyelesaikan semua tantangan JavaScript level Intermediate",
        icon: "⚡",
        requirement: function() {
            return getCompletedChallengesByPathAndDifficulty('js', 'intermediate') >= 3;
        }
    },
    {
        name: "HTML Master",
        description: "Menyelesaikan semua tantangan HTML",
        icon: "🔍",
        requirement: function() {
            return getCompletedChallengesByPath('html') >= 3;
        }
    },
    {
        name: "CSS Stylist",
        description: "Menyelesaikan semua tantangan CSS",
        icon: "🎨",
        requirement: function() {
            return getCompletedChallengesByPath('css') >= 3;
        }
    },
    {
        name: "Web Warrior",
        description: "Menyelesaikan minimal 6 tantangan dari semua kategori",
        icon: "🏆",
        requirement: function() {
            return completedChallenges.length >= 6;
        }
    }
];

// Variabel global
let currentPath = 'html'; // Default path
let currentChallengeIndex = 0;
let completedChallenges = [];
let console_logs = []; // Untuk menangkap output console.log

// Elemen DOM
const challengeContainer = document.getElementById('challenge-container');
const challengeTitle = document.getElementById('challenge-title');
const challengeDescription = document.getElementById('challenge-description');
const codeInput = document.getElementById('code-input');
const previewFrame = document.getElementById('preview-frame');
const outputElement = document.getElementById('output');
const statusMessage = document.getElementById('status-message');
const hintContent = document.getElementById('hint-content');
const completedCount = document.getElementById('completed-count');
const totalCount = document.getElementById('total-count');
const progressFill = document.getElementById('progress-fill');
const badgesContainer = document.getElementById('badges-container');
const nextButton = document.getElementById('next-btn');

// Menimpa fungsi console.log untuk menangkap output
console.log = function() {
    const args = Array.from(arguments);
    console_logs.push(args.length === 1 ? args[0] : args);
    outputElement.innerHTML += `<div>${args.join(' ')}</div>`;
};

// Inisialisasi aplikasi
function initApp() {
    // Set total jumlah tantangan
    totalCount.textContent = challenges.length;
    
    // Muat tantangan berdasarkan path
    loadChallengesByPath(currentPath);
    
    // Load tantangan pertama
    loadChallenge(0);
    
    // Load badges
    renderBadges();
    
    // Load completed challenges dari localStorage
    loadProgress();
}

// Switch path (HTML, CSS, JS)
function switchPath(path) {
    currentPath = path;
    
    // Update UI untuk path button
    document.querySelectorAll('.path-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.path-btn[onclick="switchPath('${path}')"]`).classList.add('active');
    
    // Load tantangan berdasarkan path
    loadChallengesByPath(currentPath);
    
    // Load tantangan pertama dari path baru
    loadChallenge(0);
}

// Load tantangan berdasarkan path
function loadChallengesByPath(path) {
    // Filter tantangan berdasarkan path
    const filteredChallenges = challenges.filter(challenge => challenge.path === path);
    
    // Render kartu tantangan
    challengeContainer.innerHTML = '';
    filteredChallenges.forEach((challenge, index) => {
        const isCompleted = completedChallenges.some(comp => comp.title === challenge.title);
        
        const card = document.createElement('div');
        card.className = `challenge-card ${challenge.difficulty} ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="card-header">
                <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
                ${isCompleted ? '<span class="completed-badge">✓</span>' : ''}
            </div>
            <h4>${challenge.title}</h4>
            <p class="estimated-time">Estimasi: ${challenge.estimatedTime}</p>
            <button onclick="loadChallenge(${index})" class="select-challenge-btn">Pilih</button>
        `;
        challengeContainer.appendChild(card);
    });
}

// Load tantangan spesifik
function loadChallenge(index) {
    // Filter tantangan berdasarkan path saat ini
    const filteredChallenges = challenges.filter(challenge => challenge.path === currentPath);
    
    if (index >= 0 && index < filteredChallenges.length) {
        currentChallengeIndex = index;
        const challenge = filteredChallenges[index];
        
        // Update UI
        challengeTitle.textContent = challenge.title;
        challengeDescription.innerHTML = `
            <p>${challenge.description}</p>
            ${challenge.examples ? `<pre class="examples"><code>${challenge.examples}</code></pre>` : ''}
        `;
        codeInput.value = challenge.initialCode;
        hintContent.innerHTML = challenge.hint;
        
        // Reset status dan output
        statusMessage.innerHTML = '';
        outputElement.innerHTML = '';
        
        // Atur tampilan preview/output berdasarkan path
        if (challenge.path === 'html' || challenge.path === 'css') {
            previewFrame.style.display = 'block';
            outputElement.style.display = 'none';
            document.getElementById('preview-title').textContent = 'Preview';
        } else {
            previewFrame.style.display = 'none';
            outputElement.style.display = 'block';
            document.getElementById('preview-title').textContent = 'Output';
        }
        
        // Disable next button
        nextButton.disabled = true;
        
        // Highlight aktif tantangan di sidebar
        document.querySelectorAll('.challenge-card').forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
}

// Jalankan kode
function runCode() {
    // Reset output
    outputElement.innerHTML = '';
    console_logs = [];
    
    const code = codeInput.value;
    const filteredChallenges = challenges.filter(challenge => challenge.path === currentPath);
    const currentChallenge = filteredChallenges[currentChallengeIndex];
    
    if (currentChallenge.path === 'js') {
        try {
            // Jalankan kode JavaScript
            eval(code);
        } catch (error) {
            outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
        }
    } else if (currentChallenge.path === 'html' || currentChallenge.path === 'css') {
        try {
            // Preview HTML/CSS
            const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
            doc.open();
            doc.write(code);
            doc.close();
        } catch (error) {
            outputElement.innerHTML += `<div class="error">Error: ${error.message}</div>`;
        }
    }
}

// Periksa solusi
function checkSolution() {
    const code = codeInput.value;
    const filteredChallenges = challenges.filter(challenge => challenge.path === currentPath);
    const currentChallenge = filteredChallenges[currentChallengeIndex];
    
    // Jalankan test function
    const isCorrect = currentChallenge.test(code);
    
    if (isCorrect) {
        statusMessage.innerHTML = '<div class="success-message">✓ Selamat! Kamu berhasil menyelesaikan tantangan ini.</div>';
        nextButton.disabled = false;
        
        // Tambahkan ke completed challenges jika belum ada
        if (!completedChallenges.some(challenge => challenge.title === currentChallenge.title)) {
            completedChallenges.push({
                title: currentChallenge.title,
                path: currentChallenge.path,
                difficulty: currentChallenge.difficulty
            });
            
            // Update localStorage
            saveProgress();
            
            // Update UI
            updateProgressUI();
            
            // Update badge status
            checkAndUpdateBadges();
            
            // Mark tantangan sebagai selesai di sidebar
            document.querySelectorAll('.challenge-card')[currentChallengeIndex].classList.add('completed');
        }
    } else {
        statusMessage.innerHTML = '<div class="error-message">✗ Hmm, sepertinya ada yang salah. Coba lagi!</div>';
        nextButton.disabled = true;
    }
}

// Pindah ke tantangan berikutnya
function nextChallenge() {
    const filteredChallenges = challenges.filter(challenge => challenge.path === currentPath);
    
    if (currentChallengeIndex < filteredChallenges.length - 1) {
        loadChallenge(currentChallengeIndex + 1);
    } else {
        statusMessage.innerHTML = '<div class="info-message">Kamu telah menyelesaikan semua tantangan di jalur ini!</div>';
    }
}

// Toggle hint visibility
function toggleHint() {
    if (hintContent.style.display === 'block') {
        hintContent.style.display = 'none';
    } else {
        hintContent.style.display = 'block';
    }
}

// Reset kode ke kondisi awal
function resetCode() {
    const filteredChallenges = challenges.filter(challenge => challenge.path === currentPath);
    const currentChallenge = filteredChallenges[currentChallengeIndex];
    
    codeInput.value = currentChallenge.initialCode;
    statusMessage.innerHTML = '';
    outputElement.innerHTML = '';
}

// Simpan progress ke localStorage
function saveProgress() {
    localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
}

// Load progress dari localStorage
function loadProgress() {
    const saved = localStorage.getItem('completedChallenges');
    if (saved) {
        completedChallenges = JSON.parse(saved);
        updateProgressUI();
        loadChallengesByPath(currentPath); // Refresh tampilan dengan status completed
        checkAndUpdateBadges();
    }
}

// Update UI progress
function updateProgressUI() {
    // Update completed count
    completedCount.textContent = completedChallenges.length;
    
    // Update progress bar
    const progressPercentage = (completedChallenges.length / challenges.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;
}

// Helper function: get completed challenges by path
function getCompletedChallengesByPath(path) {
    return completedChallenges.filter(challenge => challenge.path === path).length;
}

// Helper function: get completed challenges by path and difficulty
function getCompletedChallengesByPathAndDifficulty(path, difficulty) {
    return completedChallenges.filter(challenge => 
        challenge.path === path && challenge.difficulty === difficulty
    ).length;
}

// Render badges
function renderBadges() {
    badgesContainer.innerHTML = '';
    badges.forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge';
        badgeElement.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-info">
                <h4>${badge.name}</h4>
                <p>${badge.description}</p>
            </div>
        `;
        badgesContainer.appendChild(badgeElement);
    });
}

// Check and update badges status
function checkAndUpdateBadges() {
    badges.forEach((badge, index) => {
        const badgeElement = badgesContainer.children[index];
        if (badge.requirement()) {
            badgeElement.classList.add('earned');
        } else {
            badgeElement.classList.remove('earned');
        }
    });
}

// Initialize app on load
window.onload = initApp;
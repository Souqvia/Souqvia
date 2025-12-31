<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>Souqvia | AI Product Finder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">

  <style>
    body {
      font-family: 'Cairo', sans-serif;
    }
  </style>
</head>

<body class="bg-gray-100 text-gray-900">

  <!-- Header -->
  <header class="bg-emerald-600 text-white p-6 text-center">
    <h1 class="text-3xl font-bold">Souqvia</h1>
    <p class="mt-2">اكتشف المنتجات المربحة للتجارة الإلكترونية في الجزائر</p>
  </header>

  <!-- Main -->
  <main class="max-w-3xl mx-auto p-6">
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-semibold mb-4">ابحث عن منتج</h2>

      <input
        id="productInput"
        type="text"
        placeholder="مثال: سماعات بلوتوث"
        class="w-full border rounded-lg p-3 mb-4"
      />

      <button
        onclick="searchProduct()"
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold"
      >
        🔍 بحث
      </button>

      <div id="result" class="mt-6 text-gray-700"></div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="text-center text-sm text-gray-500 mt-10 mb-4">
    © 2025 Souqvia — All rights reserved
  </footer>

  <!-- Script -->
  <script>
    function searchProduct() {
      const input = document.getElementById("productInput").value;
      const result = document.getElementById("result");

      if (!input) {
        result.innerHTML = "❌ من فضلك أدخل اسم منتج";
        return;
      }

      result.innerHTML = `
        ✅ <strong>${input}</strong><br>
        هذا المنتج لديه طلب جيد على:
        <ul class="list-disc ml-6 mt-2">
          <li>Ouedkniss</li>
          <li>Jumia</li>
          <li>Facebook Marketplace</li>
        </ul>
        <p class="mt-2 text-emerald-600 font-semibold">
          💡 توصية: مناسب للبيع بهامش ربح جيد
        </p>
      `;
    }
  </script>

</body>
</html>

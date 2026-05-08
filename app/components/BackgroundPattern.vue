<template>
  <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">

    <!-- Dot grid — inline style garantiza que Tailwind v4 no lo filtre -->
    <div class="absolute inset-0"
      style="background-image: radial-gradient(circle, #e63946 2px, transparent 2px); background-size: 40px 40px; opacity: 0.18;">
    </div>

    <!-- Floating circles — inline rgba para garantizar render -->
    <div class="absolute top-[5%] -left-32 w-80 h-80 rounded-full"
      style="border: 2px solid rgba(230,57,70,0.30)"></div>
    <div class="absolute top-[25%] -right-40 w-[450px] h-[450px] rounded-full"
      style="border: 2px solid rgba(30,58,95,0.40)"></div>
    <div class="absolute top-[45%] -left-20 w-72 h-72 rounded-full"
      style="border: 2px solid rgba(230,57,70,0.25)"></div>
    <div class="absolute top-[65%] right-[10%] w-64 h-64 rounded-full"
      style="border: 2px solid rgba(30,58,95,0.35)"></div>
    <div class="absolute top-[85%] -left-24 w-56 h-56 rounded-full"
      style="border: 2px solid rgba(230,57,70,0.25)"></div>

    <!-- Logo watermarks -->
    <img src="/logo-sofnet.png" alt=""
      class="absolute top-[15%] right-[8%] w-32 h-32 rotate-12 object-contain"
      style="opacity: 0.07" />
    <img src="/logo-sofnet.png" alt=""
      class="absolute top-[40%] left-[5%] w-28 h-28 -rotate-6 object-contain"
      style="opacity: 0.07" />
    <img src="/logo-sofnet.png" alt=""
      class="absolute top-[60%] right-[12%] w-24 h-24 object-contain"
      style="opacity: 0.07; transform: rotate(20deg)" />
    <img src="/logo-sofnet.png" alt=""
      class="absolute top-[80%] left-[15%] w-20 h-20 -rotate-12 object-contain"
      style="opacity: 0.07" />
  </div>
</template>

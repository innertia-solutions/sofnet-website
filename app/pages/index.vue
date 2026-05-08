<template>
  <div class="relative">
    <!-- Fondo con patrón detrás de todo -->
    <div class="absolute inset-0 bg-white dark:bg-brand-navy">
      <BackgroundPattern />
    </div>

    <!-- Nav siempre encima de todo -->
    <div class="relative z-50">
      <Navigation />
    </div>

    <!-- Hero -->
    <div class="relative z-30">
      <HeroSection />
    </div>

    <!-- Secciones (encima del fondo) -->
    <div class="relative z-10">
      <ServicesSection />
      <ClientsSection />
      <PartnersStrip />
      <AboutSection />
      <CtaBanner />
      <ContactSection />
      <Footer />
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Sofnet — Tu Socio Tecnológico de Confianza' })
</script>

<template>
  <Layout>
    <div class="card">
      <div class="space">
        <h1 class="hello">Olá 👋 Faz login com a tua conta</h1>
        <LoginForm />
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@layout/Default.vue";
import LoginForm from "@/components/LoginForm/index.vue";
</script>

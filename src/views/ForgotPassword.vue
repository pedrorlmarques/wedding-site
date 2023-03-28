<template>
  <Layout>
    <div class="card">
      <div class="space">
        <router-link as="button" type="button" to="/" class="btn">
          <ArrowLeftIcon class="stroke-primary-600 inline-block" />
          Voltar
        </router-link>
        <h1 class="hello">Esqueceu-se da sua password?</h1>
        <p>
          Não se preocupe, estamos aqui para ajudar. Basta introduzir o seu
          email e nós enviaremos instruções para redefinir a sua password.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from "@layout/Default.vue";
import ArrowLeftIcon from "@/assets/arrow-left.svg?component";
import ForgotPasswordForm from "@components/ForgotPasswordForm/index.vue";
</script>

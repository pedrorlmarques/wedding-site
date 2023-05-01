<template>
  <Default>
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
  </Default>
</template>

<script lang="ts" setup>
import ArrowLeftIcon from "@/assets/arrow-left.svg?component";
</script>

<template>
  <FormKit
    type="form"
    :actions="false"
    @submit="auth.sendPasswordResetEmail(user.email)"
    #default="{ state: { valid } }"
  >
    <div>
      <label for="email">O seu e-mail</label>
      <FormKit
        type="email"
        name="email"
        id="email"
        placeholder="nome@email.pt"
        v-model="user.email"
        validation="required|email"
        :validation-messages="{
          required: 'Por favor insira o seu email',
          email: 'Por favor insira um email válido',
        }"
      />
    </div>
    <button type="submit" :disabled="!valid">Enviar</button>
  </FormKit>
</template>
<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const auth = useAuth();

const user = ref({
  email: "",
});
</script>

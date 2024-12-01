<template>
  <FormKit
    type="form"
    @submit="handleSubmit()"
    :actions="false"
    #default="{ state: { valid } }"
  >
    <button type="button" class="google-btn" @click="handleSubmit('google')">
      <GoogleIcon icon="google" class="w-4 h-4 mr-2 -ml-1 fill-white" />
      <span>Login com o Google</span>
    </button>
    <hr />
    <div>
      <label for="email">E-mail</label>
      <FormKit
        type="email"
        name="email"
        id="email"
        v-model="user.email"
        validation="required|email"
        :validation-messages="{
          required: 'Por favor insira o seu email',
          email: 'Por favor insira um email válido',
        }"
      />
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
        >Password</label
      >
      <FormKit
        type="password"
        name="password"
        id="password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          required: 'Por favor insira a sua password',
          length: 'A password deve ter pelo menos 6 caracteres',
          matches: 'A password deve conter pelo menos um número',
        }"
        v-model="user.password"
      />
    </div>
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-row items-start items-center">
        <div class="flex items-center h-5">
          <input
            id="remember"
            aria-describedby="remember"
            type="checkbox"
            class="checkbox"
            v-model="user.rememberMe"
            @click="rememberMe()"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="remember" class="text-gray-500 mb-0">Lembrar</label>
        </div>
      </div>
      <router-link to="/forgot-password" class="forgot">
        Esqueceu-se da password?
      </router-link>
    </div>
    <button type="submit" :disabled="!valid">Entrar</button>
    <p class="text-sm font-light text-gray-500">
      <span>Ainda não tem conta?</span>
      <router-link as="a" to="/register" class="register">
        Registe-se
      </router-link>
    </p>
  </FormKit>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount } from "vue";
import { useStorage } from "@vueuse/core";
import { useAuth } from "@/composables/useAuth";
import GoogleIcon from "@/assets/google.svg?component";
import { type Provider } from "@supabase/gotrue-js/dist/main/lib/types";
import router from "@/router";

const { handleLogin, handleOAuthLogin, isLoggedIn } = useAuth();

const rememberedUser = JSON.parse(localStorage.getItem("user") || "{}") as User;

let user: User = reactive({
  email: rememberedUser?.email || "",
  password: "",
  rememberMe: false,
});

const handleSubmit = async (provider?: Provider) => {
  if (provider) {
    await handleOAuthLogin(provider);
  } else {
    await handleLogin({ email: user.email, password: user.password });
  }

  router.push("/");
};

const rememberMe = () => {
  user.rememberMe = !user.rememberMe;

  if (user.rememberMe) {
    useStorage("user", { ...user, rememberMe: true }, localStorage);
  } else {
    localStorage.removeItem("user");
    user = {
      email: "",
      password: "",
      rememberMe: false,
    };
  }
};

onBeforeMount(() => {
  if (isLoggedIn()) {
    router.push("/");
  }
});
</script>

<styles lang="postcss" scoped>
a.forgot {
  @apply text-right;
}
</styles>

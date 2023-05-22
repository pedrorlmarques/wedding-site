<template>
  <Default>
    <div class="card">
      <div class="space">
        <router-link as="button" type="button" to="/" class="btn">
          <ArrowLeftIcon class="stroke-primary-600 inline-block" />
          Voltar
        </router-link>
        <h1 class="hello"> Vai ser redirecionado para o link da sessão...</h1>
      </div>
    </div>
  </Default>
</template>


<script>
import ArrowLeftIcon from "@assets/arrow-left.svg";

export default {
  components: {ArrowLeftIcon},
  created() {
    window.location.href = "https://home.mycloud.com/action/share/325d25fe-b184-403e-b388-4f054c6ee7d9";
  },
};
</script>
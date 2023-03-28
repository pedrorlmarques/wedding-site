<template>
  <main>
    <article>
      <h1>Estás oficialmente convidado para o nosso casamento 💚</h1>
      <p>
        Por favor insere aqui abaixo o teu nome, e os teus convidados com todas
        as observações de cada um que queiras fazer. Avisa-nos de todas as
        restrições alimentares que tenham. Estes dados não serão partilhados com
        ninguém.
      </p>
      <InvitationForm />
    </article>
  </main>
</template>
<script setup>
import InvitationForm from "@components/InvitationForm/index.vue";
</script>
<style lang="postcss">
main {
  @apply flex flex-col items-center justify-center min-h-screen h-full bg-secondary-50;

  & article {
    @apply prose text-center px-8 sm:px-0;

    & h1 {
      @apply text-4xl font-bold text-gray-900;
    }
  }
}
</style>

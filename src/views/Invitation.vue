<template>
  <DashboardLayout>
    <div class="container mx-auto px-2 sm:px-32 flex justify-start">
      <router-link custom v-slot="{ navigate }" to="/">
        <button
          class="btn"
          type="submit"
          @click="navigate"
          @keypress.esc="navigate"
        >
          <ArrowLeftIcon />
          Voltar
        </button>
      </router-link>
    </div>
    <article>
      <div class="left">
        <h1 class="block mt-8">
          Estás oficialmente convidado para o nosso casamento 💚
        </h1>
        <p>
          Por favor insere aqui abaixo o teu nome, e os teus convidados com
          todas as observações de cada um que queiras fazer. Avisa-nos de todas
          as restrições alimentares que tenham. <br />
          Estes dados não serão partilhados com ninguém.
        </p>
        <img src="@/assets/Invitation.jpeg" />

        <div class="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-6">
          <div class="flex flex-col">
            <p><strong>Morada da igreja</strong></p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.569082906533!2d-9.109910984758805!3d38.45142128071321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19521bec4c44e7%3A0x3865904eae0cc17!2sIgreja%20de%20Santa%20Maria!5e0!3m2!1spt-PT!2spt!4v1679997392801!5m2!1spt-PT!2spt"
              class="w-full h-96 mb-16"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div class="flex flex-col">
            <p><strong>Morada da Quinta</strong></p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.5904387747246!2d-8.944567484756428!3d38.54320817534889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19443c664d65e7%3A0xed636775580998fe!2sHalma!5e0!3m2!1spt-PT!2spt!4v1679997408852!5m2!1spt-PT!2spt"
              class="w-full h-96 mb-16"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <InvitationForm />
      </div>
      <div class="right">
        <div class="iframes-container">
          <div class="grid grid-cols-1 gap-0 sm:gap-6">
            <div class="flex flex-col">
              <p><strong>Morada da igreja</strong></p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.569082906533!2d-9.109910984758805!3d38.45142128071321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19521bec4c44e7%3A0x3865904eae0cc17!2sIgreja%20de%20Santa%20Maria!5e0!3m2!1spt-PT!2spt!4v1679997392801!5m2!1spt-PT!2spt"
                class="w-full h-64"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div class="flex flex-col">
              <p><strong>Morada da Quinta</strong></p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.5904387747246!2d-8.944567484756428!3d38.54320817534889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19443c664d65e7%3A0xed636775580998fe!2sHalma!5e0!3m2!1spt-PT!2spt!4v1679997408852!5m2!1spt-PT!2spt"
                class="w-full h-64"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </article>
  </DashboardLayout>
</template>
<script setup>
import ArrowLeftIcon from "@/assets/arrow-left.svg?component";
import DashboardLayout from "@/layout/Dashboard.vue";
import InvitationForm from "@components/InvitationForm/index.vue";
</script>

<style lang="postcss" scoped>
main {
  @apply flex flex-col items-center justify-center bg-secondary-50;

  && article {
    @apply prose flex justify-between text-center my-16 px-2 md:px-0 max-w-5xl w-full;

    & div.left {
      @apply flex flex-col justify-end w-full md:w-10/12;
    }

    & div.right {
      @apply hidden md:flex w-1/3 ml-3 justify-center relative;

      & .iframes-container {
        @apply sticky top-0 h-80;
      }
    }

    & img {
      @apply w-full max-w-4xl mx-auto h-auto mb-8;
    }

    & h1 {
      @apply text-4xl font-bold text-gray-900;
    }
  }

  & button.btn {
    @apply flex justify-end items-center border border-black no-underline py-2 px-4 rounded mr-auto;

    & svg {
      @apply w-6 h-6 mr-2 stroke-black;
    }

    &:hover {
      @apply bg-primary-600 text-white border-primary-600;

      & svg {
        @apply stroke-white;
      }
    }
  }
}
</style>

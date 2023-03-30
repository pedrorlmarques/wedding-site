<template>
  <DashboardLayout>
    <div class="container mx-auto px-2 sm:px-32">
      <Timer class="my-8" />
      <h1 class="wedding-font">Maria Inês e Pedro</h1>

      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mx-8 sm:mx-0"
      >
        <AnchorToPagesButton title="Convite" path="/convite">
          <template #icon>
            <WeddingInvitationSvg />
          </template>
          <template #description>
            Pedimos que aqui adiciones todas as pessoas vão contigo e que
            menciones quais são as restrições alimentares de cada 1 das pessoas
            que vem contigo. Contamos contigo!
          </template>
        </AnchorToPagesButton>
        <AnchorToPagesButton title="Fotografias" path="/fotos" disabled>
          <template #icon>
            <CameraSvg />
          </template>
          <template #description>
            Ao carregares aqui queremos que faças upload das muitas fotografias
            que vais tirar no nosso casamento!
          </template>
        </AnchorToPagesButton>
        <AnchorToPagesButton title="Menu" path="/menu" disabled>
          <template #icon>
            <ForkAndSpoonSvg />
          </template>
          <template #description>
            Não sabes o que contém o Menu? Aqui podes ver em detalhe!
          </template>
        </AnchorToPagesButton>
        <AnchorToPagesButton title="Playlist" path="/playlist" disabled>
          <template #icon>
            <DiscoBallSvg />
          </template>
          <template #description>
            Conheces bem os noivos e sabes quais são os gostos deles? Muito bem,
            então sugere as melhores músicas nesta fantástica Playlist!
          </template>
        </AnchorToPagesButton>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layout/Dashboard.vue";
import Timer from "@components/Timer/index.vue";
import AnchorToPagesButton from "@components/AnchorToPagesButton/index.vue";
import WeddingInvitationSvg from "@/assets/wedding-invitation.svg?component";
import CameraSvg from "@/assets/camera.svg?component";
import DiscoBallSvg from "@/assets/disco-ball.svg?component";
import ForkAndSpoonSvg from "@/assets/fork-and-spoon.svg?component";
</script>

<style scoped lang="postcss">
svg > .st0 {
  @apply fill-current text-secondary-500;
}

.wedding-font {
  @apply font-bacalisties text-5xl my-12 md:my-32 md:text-7xl text-secondary-400 text-center;
}
</style>

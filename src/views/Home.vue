<template>
  <main>
    <div class="container mx-auto">
      <Timer class="my-8" />
      <img class="max-w-xl my-8 mx-auto" src="@/assets/invitation.jpeg" />

      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="flex justify-center items-center">
          <AnchorToPagesButton title="Convite" path="/convite">
            <template #icon>
              <WeddingInvitationSvg />
            </template>
            <template #description>
              Pedimos que aqui adiciones todas as pessoas vão contigo e que
              menciones quais são as restrições alimentares de cada 1 das
              pessoas que vem contigo. Contamos contigo!
            </template>
          </AnchorToPagesButton>
        </div>
        <div class="flex justify-center items-center">
          <AnchorToPagesButton title="Fotografias" path="/fotos" disabled>
            <template #icon>
              <CameraSvg />
            </template>
            <template #description>
              Ao carregares aqui queremos que faças upload das muitas
              fotografias que vais tirar no nosso casamento!
            </template>
          </AnchorToPagesButton>
        </div>

        <div class="flex justify-center items-center">
          <AnchorToPagesButton title="Menu" path="/menu" disabled>
            <template #icon>
              <ForkAndSpoonSvg />
            </template>
            <template #description>
              Não sabes o que contém o Menu? Aqui podes ver em detalhe!
            </template>
          </AnchorToPagesButton>
        </div>

        <div class="flex justify-center items-center">
          <AnchorToPagesButton title="Playlist" path="/playlist" disabled>
            <template #icon>
              <DiscoBallSvg />
            </template>
            <template #description>
              Conheces bem os noivos e sabes quais são os gostos deles? Muito
              bem, então sugere as melhores músicas nesta fantástica Playlist!
            </template>
          </AnchorToPagesButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Timer from "@components/Timer/index.vue";
import AnchorToPagesButton from "@components/AnchorToPagesButton/index.vue";
import WeddingInvitationSvg from "@/assets/wedding-invitation.svg?component";
import CameraSvg from "@/assets/camera.svg?component";
import DiscoBallSvg from "@/assets/disco-ball.svg?component";
import ForkAndSpoonSvg from "@/assets/fork-and-spoon.svg?component";
</script>

<style scoped lang="postcss">
main {
  @apply flex flex-col items-center justify-center min-h-screen h-full bg-secondary-50;

  & svg > .st0 {
    @apply fill-current text-secondary-500;
  }
}
</style>

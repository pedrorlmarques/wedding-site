<template>
  <nav class="bg-secondary-50 px-2 sm:px-4 py-2.5 w-full">
    <div class="container flex flex-wrap items-center justify-end mx-auto">
      <div class="flex items-center md:order-2 relative">
        <button
          type="button"
          class="btn-menu"
          id="user-menu-button"
          @click="toggleMenu()"
          :aria-expanded="openMenu"
        >
          <span class="sr-only">Open user menu</span>
          <UserSvg class="w-14 h-14 rounded-full user-icon" alt="user photo" />
          <ArrowSvg class="arrow-icon" :class="openMenu ? 'rotate-180' : ''" />
        </button>
        <!-- Dropdown menu -->
        <div
          v-if="openMenu"
          class="absolute top-16 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
          ref="menu"
          id="user-dropdown"
        >
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900">{{ user?.name }}</span>

            <span class="block text-sm font-medium text-gray-500 truncate">{{
              user?.email
            }}</span>
          </div>
          <ul class="py-2">
            <li>
              <button
                @click="logout()"
                class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import UserSvg from "@assets/user.svg?component";
import ArrowSvg from "@assets/arrow-down-up.svg?component";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const menu = ref(null);
const router = useRouter();
const { userSession, handleLogout } = useAuth();

const user = computed(() => userSession.value?.user.user_metadata);

onClickOutside(menu, () => (openMenu.value = false));

const toggleMenu = () => {
  openMenu.value = true;
};

const logout = async () => {
  await handleLogout();
  router.push({ name: "Login" });
};

const openMenu = ref(false);
</script>
<style lang="postcss" scoped>
button[type="button"].btn-menu {
  @apply flex items-center text-sm bg-transparent rounded-full md:mr-0 shadow-none p-0.5 hover:opacity-50 hover:bg-transparent;

  & svg {
    &.user-icon {
      @apply mr-2;
    }

    &.arrow-icon {
      @apply w-8 h-8 text-black;
    }
  }
}
</style>

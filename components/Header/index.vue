<script setup>
import { useCssModule } from "vue";
import { ref } from "vue";
const styles = useCssModule();

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const navigationLinks = computed(() => {
  return props.data?.pages
    .map((page) => {
      let title = page.head.title;
      if (title.match(/[-–:|]/)) {
        title = title.split(/[-–:|]/)[0].trim();
      }

      return {
        name: page.homePage ? t("home") : title,
        slug: page.homePage ? "" : page.slug,
      };
    })
    .sort((a, b) => {
      if (a.name === t("home")) return -1;
      if (b.name === t("home")) return 1;
      return 0;
    });
});

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header :class="[styles.header, { [styles.active]: isMenuOpen }]">
    <div class="container">
      <div :class="styles.wrapper">
        <div :class="styles.burger" @click="toggleMenu">
          <span :class="{ [styles.active]: isMenuOpen }"></span>
          <span :class="{ [styles.active]: isMenuOpen }"></span>
          <span :class="{ [styles.active]: isMenuOpen }"></span>
        </div>
        <div :class="styles.logo">
          <NuxtLink to="/">
            <NuxtImg
              v-if="data.logo?.length"
              :src="`unsplash${data.logo[0]?.path}`"
              :alt="data.logo[0]?.alt || 'logo'"
              quality="25"
              preload
              loading="lazy"
              :placeholder="[32, 32]"
            />
          </NuxtLink>
        </div>

        <nav :class="styles.nav">
          <ul :class="styles.navList">
            <li
              v-for="(link, index) in navigationLinks"
              :key="index"
              :class="styles.navItem"
            >
              <NuxtLink :to="`/${link.slug}`" external>{{
                link.name
              }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <ClientOnly>
          <div :class="styles.buttons">
            <GeneralButton
              :data="{
                link: '/go',
                title: t('login'),
                target: '_blank',
                rel: 'noopener noreferrer',
              }"
            />

            <GeneralButtonTwo
              :data="{
                link: '/go',
                title: t('registration'),
                target: '_blank',
                rel: 'noopener noreferrer',
              }"
            />
          </div>
        </ClientOnly>

        <nav v-if="isMenuOpen" :class="styles.mobileMenu">
          <ul>
            <li v-for="(link, i) in navigationLinks" :key="i">
              <NuxtLink :to="`/${link.slug}`">{{ link.name }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped module>
.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  border-bottom: 0.063rem solid var(--border-2);

  @include media(tablet) {
    padding: 0.125rem;
    border: none;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.375rem 0;

  @include media(tablet) {
    padding: 1.063rem 0.875rem;
    border-radius: 0.688rem;
    background: var(--background-02);
  }
}

.logo {
  min-width: 3rem;
  height: 3rem;
  min-height: 3rem;
  border-radius: 0.25rem;
  overflow: hidden;

  @include media(tablet) {
    min-width: 2rem;
    height: 2rem;
    min-height: 2rem;
  }

  a {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.nav {
  max-width: 60%;

  @include media(tablet) {
    display: none;
  }
}

.navList {
  display: flex;
  align-items: center;
  gap: 1rem;
  list-style: none;
  margin: 0;
  overflow: hidden;
}

.navItem {
  margin: 0;
  &:before {
    content: none;
  }
  a {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-white);
    transition: color 0.3s ease-in-out;
    text-align: center;
    text-decoration: none;

    &:hover {
      color: var(--color-01);
    }

    &.router-link-active {
      color: var(--color-01);
    }
  }
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.531rem;
  border-radius: 50%;
  background: var(--color-gradient);
  width: 1.813rem;
  min-width: 1.813rem;
  height: 1.813rem;
  border: 0.063rem solid var(--color-04);
  position: relative;

  span {
    height: 0.125rem;
    background: var(--color-black-02);
    transition: 0.3s;
    border-radius: 0.063rem;
  }

  @include media(tablet) {
    display: flex;
  }

  & span.active:nth-child(1) {
    transform: rotate(45deg) translate(0.15rem, 0.16rem);
  }

  & span.active:nth-child(2) {
    opacity: 0;
    height: 0;
    width: 0;
  }

  & span.active:nth-child(3) {
    transform: rotate(-45deg) translate(0.16rem, -0.2rem);
  }
}

.mobileMenu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--background-02);
  padding: 3rem 1rem 1rem;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
  flex-direction: column;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 1rem;

      a {
        color: white;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }

  @include media(tablet) {
    display: flex;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 1rem;

  @include media(tablet) {
    gap: 0.25rem;
  }
}
</style>

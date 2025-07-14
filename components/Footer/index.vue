<script setup>
import { useCssModule } from "vue";
import { useRequestURL } from "#app";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const styles = useCssModule();

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

const url = useRequestURL();
const siteDomain = `${url.protocol}//${url.host}`;
const currentYear = new Date().getFullYear();
const logos = [
  "/mastercard-logo.svg",
  "/visa-logo.svg",
  "/apple-logo.svg",
  "/google-logo.svg",
];
</script>

<template>
  <footer :class="styles.footer">
    <div class="container">
      <div :class="styles.wrapper">
        <div :class="styles.content">
          <div :class="styles.copyright">© Copyright {{ currentYear }}.</div>

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

          <div :class="styles.logos">
            <div
              v-for="(logo, index) in logos"
              :key="index"
              :class="styles.logo"
            >
              <img :src="logo" :alt="`logo-${index}`" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 0 1rem;

  @include media(mobile) {
    align-items: flex-start;
    padding: 1rem 0;
  }
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;

  @include media(mobile) {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 0;
    width: 100%;
  }
}

.navList {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @include media(mobile) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.675rem;
    width: 100%;
    margin-bottom: 2rem;
  }
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
    line-height: 120%;
    transition: color 0.3s;
    color: var(--color-white);
    text-align: center;

    @include media(mobile) {
      text-align: left;
    }

    &:hover {
      color: var(--color-01);
    }
  }
}
.logos {
  display: flex;
  gap: 1.313rem;
  align-items: center;
  @include media(mobile) {
    width: 100%;
    justify-content: center;
    margin-bottom: 2rem;
  }
}

.logo {
  width: 3.188rem;
  height: 1.313rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.copyright {
  font-size: 0.875rem;
  @include media(mobile) {
    text-align: center;
    margin: 0 auto;
  }
}
</style>

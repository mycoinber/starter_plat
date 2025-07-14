<script setup>
import { useCssModule } from "vue";
const styles = useCssModule();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <NuxtLink
    :to="data.link"
    :class="styles.button"
    :target="data.target || '_self'"
    :rel="data.rel || ''"
  >
    {{ data.title }}
  </NuxtLink>
</template>

<style lang="scss" scoped module>
.button {
  font-family: var(--font-01);
  font-size: 0.875rem;
  font-weight: 400;
  position: relative;
  z-index: 1;
  color: transparent;
  background: var(--color-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  border-radius: 3.75rem;
  padding: 0.656rem 2.5rem 0.656rem 1rem;
  transition: 0.4s all;
  border: 0.063rem solid var(--add-gold);

  @include media(tablet) {
    padding: 0.438rem 0.875rem;
  }

  &:before {
    content: "";
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Cpath stroke='url(%23a)' stroke-linecap='round' d='M11.036 5v5m0-5h-5m5 0L5 11.036'/%3E%3Cdefs%3E%3ClinearGradient id='a' x1='10.91' x2='4.623' y1='15.227' y2='14.034' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23E2C07B'/%3E%3Cstop offset='1' stop-color='%23FFB921'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
    width: 1rem;
    height: 1rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translate(0, -50%);
    transition: var(--transition);

    @include media(tablet) {
      display: none;
    }
  }

  &:hover {
    &:before {
      transform: translate(0, -50%) rotate(45deg);
    }
  }
}
</style>

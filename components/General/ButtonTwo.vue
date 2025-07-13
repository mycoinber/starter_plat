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
  color: var(--color-black-02);
  text-align: center;
  width: fit-content;
  padding: 0.656rem 2.5rem 0.656rem 1rem;
  border-radius: 3.75rem;
  position: relative;
  border: 0.063rem solid var(--color-04);
  z-index: 1;
  overflow: hidden;
  background: var(--color-gradient);
  position: relative;

  @include media(tablet) {
    padding: 0.438rem 0.875rem;
  }

  &:before {
    content: "";
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Cpath stroke='%23000' stroke-linecap='round' d='M11.036 5v5m0-5h-5m5 0L5 11.036'/%3E%3C/svg%3E");
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

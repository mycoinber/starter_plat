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
  <section :class="styles.block">
    <div class="container">
      <div :class="styles.wrapper">
        <h1 :class="styles.title">{{ data.h1 }}</h1>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped module>
.block {
  margin: 7.5rem 0;

  @include media(tablet) {
    margin: 3rem 0;
  }
}

.title {
  text-align: center;

  @include media(tablet) {
    text-align: start;
  }
}
</style>

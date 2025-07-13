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
        <h2 :class="styles.title">{{ data.article.H1 }}</h2>
        <div :class="styles.intro" v-html="data.article.intro"></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped module>
.block {
  margin: 3rem 0 3rem 0;

  @include media(tablet) {
    margin: 2rem 0;
  }
}

.title {
  text-align: center;

  @include media(tablet) {
    text-align: start;
  }
}
</style>

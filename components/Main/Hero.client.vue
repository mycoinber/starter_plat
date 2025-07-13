<script setup>
import { useCssModule } from "vue";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const styles = useCssModule();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <section
    :class="[styles.hero, data.offer ? styles.offer : '']"
    :id="data._id"
    :style="{
      backgroundImage:
        'url(https://apexpredators.com/wp-content/uploads/2025/01/Apex-shark-expeditions-shark-facts-image-2048x995.jpg)',
    }"
  >
    <div class="container">
      <div :class="styles.contentWrapper">
        <div :class="styles.textBlock">
          <h1>It has survived not only five centuries</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <GeneralButtonTwo
            :data="{
              link: '/go',
              title: data?.buttonText || 'Play Now',
              target: '_blank',
              rel: 'noopener noreferrer',
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped module>
.hero {
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
    background: linear-gradient(360deg, #000000 0%, rgba(29, 29, 29, 0) 100%);
  }
}

.textBlock {
  max-width: 50rem;
  width: 100%;
  position: relative;
  z-index: 2;
  @include media(tablet) {
    position: absolute;
    bottom: 4rem;
    width: 100%;
    left: 1rem;
    max-width: 21.5rem;
  }
}

h1 {
  font-weight: 500;
  font-size: 5rem;
  line-height: 100%;
  margin: 0 0 0.938rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @include media(tablet) {
    font-size: 2.875rem;
    margin: 0 0 1rem;
  }
}

p {
  margin-bottom: 3rem;
  max-width: 30rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  @include media(tablet) {
    margin-bottom: 1.5rem;
  }
}
</style>

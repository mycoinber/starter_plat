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
  <section :class="styles.banners" v-if="data.offer?.sections?.length">
    <div class="container">
      <h2>{{ data.offer?.title }}</h2>
    </div>
    <!--  wrapper -->
    <div :class="styles.wrapper">
      <!--  list -->
      <div :class="styles.list">
        <!--  item -->
        <div v-for="banner in data.offer?.sections" :key="banner.id" :class="styles.item"
          :style="{ backgroundImage: `url(/api/media/${banner.images[0]?.path})` }">
          <!--  item content -->
          <div :class="styles['item-text']">
            <h3>{{ banner?.cta }}</h3>
            <p>{{ banner?.headline }}</p>
          </div>
          <GeneralButtonTwo :data="{
            link: banner?.link,
            title: 'Play Now',
            target: '_blank',
            rel: 'noopener noreferrer',
          }" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped module>
.banners {
  overflow: hidden;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.list {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.813rem;
  padding: 0 1rem;
  overflow-x: auto;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
}

.item {
  width: 27.813rem;
  min-width: 27.813rem;
  padding: 1rem;
  border-radius: 0.625rem;
  position: relative;
  height: 12.688rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @include media(tablet) {
    width: 20.813rem;
    min-width: 20.813rem;
    height: 9.375rem;
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(360deg, #1d1d1d 0%, rgba(29, 29, 29, 0) 100%);
  }
}

.item-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

h3 {
  margin: 0 0 0.125rem 0;
  font-size: 1.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @include media(tablet) {
    font-size: 1.438rem;
  }
}

p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 0.875rem;
  color: var(--color-white);
}
</style>

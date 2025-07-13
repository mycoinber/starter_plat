<script setup>
import { useCssModule } from "vue";
const styles = useCssModule();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      title: "Online casino on your device",
      banners: [
        {
          id: 1,
          title: "Bonus De Gratis",
          bonus: "Bonus +100% on your first deposit",
          image:
            "https://apexpredators.com/wp-content/uploads/2025/01/Apex-shark-expeditions-shark-facts-image-2048x995.jpg",
          buttonText: "Play Now",
          link: "#",
        },
        {
          id: 2,
          title: "Bonus De Gratis",
          bonus: "Bonus +100% on your first deposit",
          image:
            "https://apexpredators.com/wp-content/uploads/2025/01/Apex-shark-expeditions-shark-facts-image-2048x995.jpg",
          buttonText: "Play Now",
          link: "#",
        },
        {
          id: 3,
          title: "Bonus De Gratis",
          bonus: "Bonus +100% on your first deposit",
          image:
            "https://apexpredators.com/wp-content/uploads/2025/01/Apex-shark-expeditions-shark-facts-image-2048x995.jpg",
          buttonText: "Play Now",
          link: "#",
        },
        {
          id: 4,
          title: "Bonus De Gratis",
          bonus: "Bonus +100% on your first deposit",
          image:
            "https://apexpredators.com/wp-content/uploads/2025/01/Apex-shark-expeditions-shark-facts-image-2048x995.jpg",
          buttonText: "Play Now",
          link: "#",
        },
        {
          id: 5,
          title: "Bonus De Gratis",
          bonus: "Bonus +100% on your first deposit",
          image:
            "https://apexpredators.com/wp-content/uploads/2025/01/Apex-shark-expeditions-shark-facts-image-2048x995.jpg",
          buttonText: "Play Now",
          link: "#",
        },
      ],
    }),
  },
});
</script>

<template>
  <section :class="styles.banners">
    <div class="container">
      <h2>{{ data.title }}</h2>
    </div>
    <!--  wrapper -->
    <div :class="styles.wrapper">
      <!--  list -->
      <div :class="styles.list">
        <!--  item -->
        <div
          v-for="banner in data.banners"
          :key="banner.id"
          :class="styles.item"
          :style="{ backgroundImage: `url(${banner.image})` }"
        >
          <!--  item content -->
          <div :class="styles['item-text']">
            <h3>{{ banner.title }}</h3>
            <p>{{ banner.bonus }}</p>
          </div>
          <GeneralButtonTwo
            :data="{
              link: '/go',
              title: 'Play Now',
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

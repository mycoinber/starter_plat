<script setup>
import { useCssModule } from "vue";

const styles = useCssModule();

import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const publishedDateISO = computed(() => {
  const date = new Date(props.data.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`; // 2001-05-15 19:00
});

const formattedDate = computed(() => {
  return new Date(props.data.createdAt).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
});
</script>

<template>
  <section :class="styles.author">
    <div class="container">
      <div :class="styles.wrapper">
        <div :class="styles.main">
          <div :class="styles.img">
            <NuxtImg
              v-for="(image, imgIndex) in data.aiauthor.picture"
              :key="imgIndex"
              :src="`unsplash${image?.path}`"
              :alt="image?.alt || 'author'"
              width="400"
            />
          </div>

          <div :class="styles.content">
            <div :class="styles.info">
              <div :class="styles.head">
                <h3 :class="styles.title">
                  {{ data.aiauthor?.name?.first }}
                  {{ data.aiauthor?.name?.last }}
                </h3>
              </div>

              <span :class="styles.subtitle">{{ $t("author") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped module>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  border-radius: 7.5rem;
  background: var(--background-02);
}

.main {
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;

  @include media(mobile) {
    gap: 0.5rem;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.head {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;

  @include media(mobile) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    gap: 0;
  }
}

.img {
  display: block;
  width: 5.188rem;
  min-width: 5.188rem;
  height: 5.188rem;
  min-height: 5.188rem;
  background: var(--background-02);
  border-radius: 50%;
  border: 0.063rem solid var(--color-white);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.date {
  font-size: 0.875rem;
  text-align: right;
  opacity: 0.5;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title {
  margin: 0;
  font-size: 1.125rem;
  line-height: 110%;
  padding: 0;
}

.subtitle {
  font-family: var(--font-01);
  opacity: 0.5;
  font-size: 1.125rem;
  line-height: 110%;
  color: var(--color-01);
}
</style>

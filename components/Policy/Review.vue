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
  <section :class="styles.block" v-if="data?.reviews?.data.length">
    <div class="container">
      <div :class="styles.wrapper">
        <h2 :class="styles.title" v-if="data.reviews?.headline">
          {{ data.reviews?.headline }}
        </h2>

        <div :class="styles.list">
          <div
            :class="styles.item"
            v-for="(review, index) in data?.reviews?.data"
            :key="index"
            itemscope
            itemtype="http://schema.org/Review"
          >
            <div :class="styles.head">
              <div :class="styles.image">
                <NuxtImg
                  v-for="(image, imgIndex) in review.images"
                  :key="imgIndex"
                  :src="`unsplash${image?.path}`"
                  :alt="image?.alt || 'review'"
                  width="400"
                  itemprop="image"
                />
              </div>

              <div :class="styles.info">
                <span :class="styles.date" itemprop="datePublished">
                  {{ new Date(review.date).toLocaleDateString("ru-RU") }}
                </span>

                <span :class="styles.name" itemprop="author">
                  {{ review.name }}
                </span>
              </div>
            </div>

            <div
              :class="styles.rating"
              itemprop="reviewRating"
              itemscope
              itemtype="http://schema.org/Rating"
            >
              <Icon
                name="material-symbols:star-rounded"
                style="color: #ffb800"
              />
              <span itemprop="ratingValue"> {{ review.rating }}/5 </span>
            </div>

            <p :class="styles.text" itemprop="reviewBody">
              {{ review.review }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped module>
.block {
  margin: 7.5rem 0;

  @include media(tablet) {
    margin: 5rem 0;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;

  @include media(tablet) {
    gap: 0rem;
  }
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @include media(tablet) {
    display: flex;
    gap: 1rem;
    min-width: 100%;
    width: 100%;
    overflow-y: hidden;
    overflow-x: scroll;
    padding-bottom: 1rem;
  }
}

.item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 0.063rem solid var(--border);
  border-radius: 0.625rem;
  background: var(--background-02);
  width: 100%;

  @include media(tablet) {
    width: 20rem;
    min-width: 20rem;
  }
}

.name {
  font-family: var(--font-01);
  font-size: 1.35rem;
  font-weight: 700;
}

.date {
  font-size: 0.875rem;
  opacity: 0.5;
  width: 100%;
  text-align: right;
}

.image {
  width: 5rem;
  height: 5rem;
  border: 0.063rem solid var(--border);
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.head {
  display: flex;
  gap: 1rem;
}

.info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.text {
  font-size: 0.875rem;
  opacity: 0.5;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    font-size: 0.875rem;
  }
}
</style>

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
  <section :class="styles.block" :id="data._id" v-if="data?.reviews?.length">
    <div class="container">
      <div :class="styles.wrapper">
        <!-- <div
          v-if="data.content"
          v-html="data.content"
          :class="styles.content"
        ></div> -->
        <h2>{{ data?.H2 }}</h2>
        <div :class="styles.list">
          <div
            :class="styles.item"
            v-for="(review, index) in data?.reviews"
            :key="index"
            itemscope
            itemtype="http://schema.org/Review"
          >
            <div :class="styles.head">
              <div :class="styles.image">
                <NuxtImg
                  v-for="(image, imgIndex) in review.author.picture"
                  :key="imgIndex"
                  :src="`unsplash${image?.path}`"
                  :alt="image?.alt || 'author'"
                  width="400"
                  itemprop="image"
                />
              </div>

              <div :class="styles.info">
                <span :class="styles.name" itemprop="author">
                  {{ review.name }}
                </span>
                <span :class="styles.date" itemprop="jobTitle">
                  {{ review.position || "Beginner" }}
                </span>

                <span :class="styles.date" itemprop="datePublished">
                  {{ new Date(review.date).toLocaleDateString("ru-RU") }}
                </span>
                <div
                  :class="[styles.rating, styles.mobile]"
                  itemprop="reviewRating"
                  itemscope
                  itemtype="http://schema.org/Rating"
                >
                  <template v-for="i in 5" :key="i">
                    <Icon
                      name="material-symbols:star-rounded"
                      :style="{
                        color: i <= review.rating ? '#ffb800' : '#999DA4',
                      }"
                    />
                  </template>
                  <span class="rating-value" itemprop="ratingValue">{{
                    review.rating
                  }}</span>
                </div>
              </div>
              <div
                :class="[styles.rating, styles.desktop]"
                itemprop="reviewRating"
                itemscope
                itemtype="http://schema.org/Rating"
              >
                <template v-for="i in 5" :key="i">
                  <Icon
                    name="material-symbols:star-rounded"
                    :style="{
                      color: i <= review.rating ? '#ffb800' : '#999DA4',
                    }"
                  />
                </template>
                <span class="rating-value" itemprop="ratingValue">{{
                  review.rating
                }}</span>
              </div>
            </div>

            <p :class="styles.text" itemprop="reviewBody">
              {{ review.comment }}
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

  @include media(mobile) {
    margin: 5rem 0;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  padding: 3rem 1.75rem;
  background: var(--background-02);
  border-radius: 1.875rem;

  @include media(mobile) {
    gap: 0rem;
    padding: 2rem 1rem;
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @include media(mobile) {
    gap: 0.5rem;
  }
}

.item {
  display: flex;
  flex-direction: column;
  border-radius: 1.875rem;
  background: var(--color-black);
  width: 100%;
}

.name {
  font-family: var(--font-01);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 110%;
  margin: 0 0 0.563rem 0;

  @include media(mobile) {
    font-size: 0.875rem;
    margin: 0 0 0.25rem 0;
  }
}

.date {
  font-size: 1.125rem;
  width: fit-content;
  font-weight: 500;
  color: var(--color-01);

  @include media(mobile) {
    font-size: 0.875rem;
  }
}

h2 {
  text-align: center;
}

.image {
  width: 5rem;
  min-width: 5rem;
  height: 5rem;
  border: 0.063rem solid var(--border);
  border-radius: 50%;
  overflow: hidden;

  @include media(mobile) {
    width: 3.188rem;
    min-width: 3.188rem;
    height: 3.188rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.head {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 0.063rem solid var(--color-01);

  @include media(mobile) {
    gap: 0.5rem;
    padding: 1rem;
  }
}

.info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.text {
  font-size: 1.125rem;
  width: fit-content;
  font-weight: 500;
  color: var(--color-01);
  padding: 3.25rem 1.5rem 1.5rem;
  position: relative;

  @include media(mobile) {
    padding: 2.5rem 1rem 1rem;
    font-size: 0.875rem;
  }

  &:before {
    content: "";
    display: block;
    width: 1rem;
    height: 1rem;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' fill='none'%3E%3Cpath fill='%23FFB921' d='M.978 6.571 2.856.084h1.917L3.72 6.571H.978Zm4.367 0L7.224.084H9.14L8.087 6.571H5.345Z'/%3E%3C/svg%3E");
    top: 1.5rem;
    position: absolute;

    @include media(mobile) {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-01);

    @include media(mobile) {
      font-size: 0.875rem;
    }
  }
}

.desktop {
  @include media(mobile) {
    display: none;
  }
}
.mobile {
  margin-top: 0.5rem;
  display: none;
  @include media(mobile) {
    display: flex;
  }
}
</style>
